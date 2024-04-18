import path from "path"
import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import orderRoute from "./routes/orderRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";

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
app.use("/api/upload", uploadRoute)

app.get("/api/config/paypal", (req,res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

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

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
