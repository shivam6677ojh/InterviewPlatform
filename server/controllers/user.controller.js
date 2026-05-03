import User from "../models/usermodel.js";




export const getCurrentUser = async (req, res) => {

    try {

        const userid = req.userid;

        const user = await User.findById(userid);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        return res.status(200).json({
            success: true,
            user,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error Fetching user failed",
        })
    }

}