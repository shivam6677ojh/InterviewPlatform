import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many API requests, please try again later.",
    },
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts, please try again later.",
    },
});