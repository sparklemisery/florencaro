const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    try {
        const sessionId = req.cookies.sessionId;
        if (!sessionId) {
            return res.status(400).json({
                cookie: false,
                error: 'sessionId not found',
            })
        }
        const user = await User.findById(req.cookies.sessionId);
        if (!user) {
            return res.status(400).json({
                user: false,
                error: 'User not found',

            })
        }
        req.user = user;
        next();



    } catch (error) {
        res.status(404)
    }
})

module.exports = { protect };