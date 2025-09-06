import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Fallback data when database is not available
const fallbackProducts = [
  {
    _id: "1",
    name: "Sample Product 1",
    image: "https://picsum.photos/400/300?random=1",
    description: "This is a sample product while we connect to the database.",
    rating: 4.5,
    numReviews: 10,
    price: 99.99,
    brand: "Sample Brand",
    category: "Electronics",
    countInStock: 10,
  },
  {
    _id: "2",
    name: "Sample Product 2",
    image: "https://picsum.photos/400/300?random=2",
    description: "Another sample product for demonstration.",
    rating: 4.0,
    numReviews: 8,
    price: 79.99,
    brand: "Sample Brand",
    category: "Electronics",
    countInStock: 15,
  },
  {
    _id: "3",
    name: "Sample Product 3",
    image: "https://picsum.photos/400/300?random=3",
    description: "A third sample product for demonstration.",
    rating: 4.8,
    numReviews: 12,
    price: 149.99,
    brand: "Sample Brand",
    category: "Electronics",
    countInStock: 5,
  },
];

const getProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    // If database is not available, return fallback data
    console.log("Database not available, returning fallback data");
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const filteredProducts = fallbackProducts.filter(
      (product) =>
        !req.query.keyword ||
        product.name.toLowerCase().includes(req.query.keyword.toLowerCase())
    );

    res.json({
      products: filteredProducts,
      page,
      pages: Math.ceil(filteredProducts.length / pageSize),
    });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    // If database is not available, return fallback data
    console.log("Database not available, returning fallback product");
    const product = fallbackProducts.find((p) => p._id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product.id });
    res.status(200).json({ message: "product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, brand, category, image, countInStock, description } =
      req.body;

    const product = new Product({
      name: name || "sample name",
      price: price || 0,
      user: req.user._id,
      image: image || "/images/sample.png",
      brand: brand || "sample brand",
      category: category || "sample category",
      countInStock: countInStock || 0,
      numReviews: 0,
      description: description || "sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// carousel
const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products);
  } catch (error) {
    // If database is not available, return fallback data
    console.log("Database not available, returning fallback top products");
    const topProducts = fallbackProducts
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    res.status(200).json(topProducts);
  }
});

export {
  getProducts,
  getTopProducts,
  getProductById,
  createProductReview,
  deleteProduct,
  createProduct,
  updateProduct,
};
