const mongoose = require("mongoose");
const { Schema } = mongoose;

const caroSchema = new Schema({
    moves: [[{
        vty: Number, vtx: Number,
    }]],
    player_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    player_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    start_time: Number,
    timer_1: {
        type: Number,
        default: 300000,
    },
    timer_2: {
        type: Number,
        default: 300000,
    },
    pass: {
        type: Number,
        default: -1,
    },
    turn: {
        type: Number,
        default: 40000
    },
    icon_1: {
        type: String,
    },
    icon_2: {
        type: String,
    }

})

const Caro = mongoose.model('Caro', caroSchema);
module.exports = Caro;
