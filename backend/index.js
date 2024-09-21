//const express = require('express') // old way
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import clubRoute from "./routes/club.route.js";
import positionRoute from "./routes/position.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});

// Connect db
const PORT = process.env.PORT || 3000;
const app = express();

const __directoryName = path.resolve();
//Simple Api to connect to the frontend
// app.get("/home", (req, res) => {
//     return res.status(200).json({
//         message: "Hi, From the Backend",
//         success: true
//     })
// });

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

//APIs
// api structure = localhost:8000/api/v1/user/Route_based
app.use("/api/v1/user", userRoute);
app.use("/api/v1/club", clubRoute);
app.use("/api/v1/position", positionRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`)
});