import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt"];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized - No token" });
        }
        ("protectRoute middleware 1");
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Not authorized - Invalid Token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Not authorized - No user" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error - protectRoute" });
    }
}