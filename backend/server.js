import path from "path"
import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import orderRoute from "./routes/orderRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { uploads } from "./cloudinary.js";
import fs from "fs"
dotenv.config();

import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import upload from "./multer.js";

connectDB();
const PORT = process.env.PORT || "nothing";
const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute)
// app.use("/api/upload", uploadRoute)

app.get("/api/config/paypal", (req,res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve()
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running....")
  })
  
}

app.post("/api/upload", upload.array("file"), async (req, res) => {
  console.log(req.files); 
  const uploader = async (path) => await uploads(path, "file");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    if (files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({ message: "success", data: urls });
  } else {
    res.status(400).json({ message: "error uploading image" });
  }
});


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
