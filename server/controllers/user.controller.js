import User from "../models/usermodel";




export const getCurrentUser = async (req, res) => {

    try {

        const userid = req.userid;

        const user = await User.findById(userid);

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