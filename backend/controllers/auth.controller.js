import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        if (password.length < 6) {  
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }
        const exisitingUserByEmail = await User.findOne({ email: email });
        if (exisitingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        const exisitingUserByUsername = await User.findOne({ username: username });
        if (exisitingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png" ]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUSer = new User({ username, email, password: hashedPassword, image });
        
        generateTokenSetCookie(newUSer._id, res);
        await newUSer.save();
        res.status(201).json({ 
            success: true, 
            user: {
                ...newUSer._doc,
                password: ""
            } 
        });
   
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required login" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        generateTokenSetCookie(user._id, res);
        res.status(200).json({ 
            success: true, 
            user: {
                ...user._doc,
                password: ""
            } 
        });
    } catch (error) {
        console.log("Error in login controller" + error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function logout(req, res) {
    try { 
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout controller" + error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log("Error in authCheck controller" + error.message);
        res.status(500).json({ success: false, message: "Internal server error authCheck controller" });
    }
}