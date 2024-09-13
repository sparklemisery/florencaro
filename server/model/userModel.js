const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    nickname: { type: String, required: true },
    pic: String,
    onGame: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Caro",
    },



})

const User = mongoose.model('User', userSchema);
module.exports = User;