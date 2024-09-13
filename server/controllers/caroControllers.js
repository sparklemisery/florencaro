const asyncHandler = require("express-async-handler")
const Caro = require("../model/caroModel");

const sendMove = asyncHandler(async (req, res) => {
    const { vty, vtx } = req.body;
    if (!vty || !vtx) {
        return res.statusCode(400);
    }
    try {

        var move = {
            vty: vty,
            vtx: vtx,
            player_id: req.cookies.sessionId,

        }
        const caro = await Caro.findById(req.params.caroId);
        console.log("caro  : ", caro);
        caro.moves.push(move);

        caro.save();
        res.status(200).json({ message: "moved" });

    }
    catch (error) {
        return res.status(404);
    }


})



const allMoves = asyncHandler(async (req, res) => {
    try {
        const caro = await Caro.findById(req.params.caroId).populate("player_1").populate("player_2");
        if (!caro) {
            return res.status(404).json({ message: "doesn't exist this game id" });
        } else {
            return res.json({
                caro: caro,
                user: req.user,
            });
        }

    } catch (error) {
        return res.status(500).json({ error: 'an error occurred at try-catch' })
    }
})

const createCaro = asyncHandler(async (req, res) => {
    console.log("create caro bro")
    try {
        const { time, turn, first, id1, pass, icon } = req.body;
        console.log("tiem     : ", time)
        var player_1 = null;
        var player_2 = null;

        if (first == 0) {
            const rand = Math.floor(Math.random() * 2);
            if (rand === 0) {
                player_1 = id1;
            } else {
                player_2 = id1;
            }


        } else if (first == 1) {
            player_1 = id1;
        } else if (first == 2) {
            player_2 = id1;
        }
        const newCaro = new Caro({
            moves: [[]],
            player_1: player_1,
            player_2: player_2,
            timer_1: time * 60000,
            timer_2: time * 60000,
            turn: turn * 1000,
            pass: pass,
        })
        newCaro.save();
        return res.json({
            match_id: newCaro._id,
        })

    } catch (error) {
        return res.status(500).json({ error: 'an error occurred at try-catch' })
    }
})
module.exports = { allMoves, sendMove, createCaro };