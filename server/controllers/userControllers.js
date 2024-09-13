const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Caro = require("../model/caroModel");


const registerUser = asyncHandler(async (req, res) => {
    const { nickname, pic } = req.body;
    if (!nickname) {
        res.status(400);
        throw new Error("nickname or picture have problem");
    }
    const user = await User.create({
        nickname,
        pic
    });
    if (user) {
        console.log(user);
        res.setHeader('Set-Cookie', `sessionId=${user._id}; path=/; httpOnly; SameSite=none;  max-age=5184000; Secure`);
        console.log(res.getHeaders());
        res.json({
            _id: user._id,
            nickname: user.nickname,
            pic: user.pic,
        });
    } else {
        res.status(400);
        throw new Error("user not found");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.status(400).json({
            cookie: false,
            error: 'sessionId not found',
        })
    }
    const user = await User.findById(req.cookies.sessionId).populate("onGame");
    if (user.onGame != null) {
        if ((new Date()).getTime() - user.onGame.start_time >= user.onGame.turn) {
            user.onGame = null;
            user.save();
        }

    }
    if (!user) {
        return res.status(400).json({
            user: false,
            error: 'User not found',

        })
    }
    res.status(200).json(user);
}
)

const getHistory = asyncHandler(async (req, res) => {
    try {
        const matches = await Caro.find({
            $or: [
                { player_1: req.cookies.sessionId },
                { player_2: req.cookies.sessionId }
            ]
        }).populate('player_2').populate('player_1');
        console.log(matches);
        return res.status(200).json(matches);
    } catch (err) {
        console.error(err);
    }
    return res.status(400).json({

        error: 'User not found',

    })

});



module.exports = { registerUser, loginUser, getHistory };
