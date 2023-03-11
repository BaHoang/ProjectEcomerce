import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import statisticRoutes from "./routes/statisticRoutes.js";
import deliveryAddressRoutes from "./routes/deliveryAddressRoutes.js";
import dataMatchingRoutes from "./routes/dataMatchingRoutes.js";
import cloudinary from "cloudinary";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

// config file environment variable
dotenv.config();
cloudinary.v2.config({
  cloud_name: "dflbuw3z5",
  api_key: "887547968379921",
  api_secret: "Y-4Mn12nTrX5uIzKxWzUP3KAj50",
});

// connect database
connectDB();
// instance express
const app = express();

// cors
app.use(
  cors({
    origin: [`http://localhost:8080`, `http://localhost:3000`, `http://localhost:4200`,
      `http://front-end-user-telephone.s3-website-ap-southeast-1.amazonaws.com`,
      `http://front-end-admin-telephone.s3-website-ap-southeast-1.amazonaws.com`,
      
    ], //react's address
    credentials: true,
  })
);


// middleware body-parser for req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var __dirname = path.resolve();

app.use(express.static("uploads"));

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/statistic", statisticRoutes);
app.use("/api/deliveryAddress", deliveryAddressRoutes);
app.use("/api/dataMatching", dataMatchingRoutes);
// listen PORT
const PORT = process.env.PORT || 5000;
URL = process.env.URL;

app.listen(PORT, () => {
  console.log(`Example app listening at ${URL}:${PORT}`);
});
