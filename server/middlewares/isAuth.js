import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {

    try {

        const token = req.cookies;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
            })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken){
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
            })
        }
        req.userid = verifyToken.userid;
        next();

    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "Internal server error Authentication failed",
        })
    }
}

export default isAuth;