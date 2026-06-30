// frontend data -> create user -> token -> cookie

import genToken from "../config/token.js";
import User from "../models/usermodel.js";


export const  googleAuth = async (req, res) => {

    try {

        const {name, email } = req.body;

        // check if user exists
        let user = await User.findOne({email});

        if(!user){
            // create user
            user = await User.create({name, email});
        }

        let token = await genToken(user._id);

        const isLocal = req.headers.host?.includes("localhost");
        res.cookie("token", token , {
            httpOnly: true,
            secure: !isLocal,
            sameSite: isLocal ? "lax" : "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user);

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error Google Authentication failed",
        })
        console.log(error.message);
    }

}

export const logout = async (req, res) => {

    try {

        const isLocal = req.headers.host?.includes("localhost");
        res.clearCookie("token", {
            httpOnly: true,
            secure: !isLocal,
            sameSite: isLocal ? "lax" : "none",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error Logout fail",
        })
    }

}