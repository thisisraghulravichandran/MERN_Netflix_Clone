import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import { protectRoute } from "./middleware/protectRoute.js";

import movieTvRoutes from "./routes/movietv.route.js";

import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.use("/api/v1", protectRoute, movieTvRoutes);

if (ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(ENV_VARS.PORT, () => {
    connectDB();
});