const asyncHandler = require("express-async-handler");
const Caro = require("../model/caroModel");
const User = require("../model/userModel");
const checkMatch = asyncHandler(async (io) => {
    const sockets = await io.in("queue").fetchSockets();
    if (sockets.length >= 2) {
        const rand = Math.floor(Math.random() * 2);
        var p1, p2, i1, i2;
        if (rand === 0) {
            p1 = sockets[0].userId;
            p2 = sockets[1].userId;
            i1 = sockets[0].icon;
            i2 = sockets[1].icon;
        } else {
            p2 = sockets[0].userId;
            p1 = sockets[1].userId;
            i2 = sockets[0].icon;
            i1 = sockets[1].icon;
        }
        if (i2 === i1) {
            i2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUwq3CUAjVh2J3JUQ2UFWLZTIrJrZxzMP2fw&s";
        }

        const newCaro = new Caro({
            moves: [[]],
            player_1: p1,
            player_2: p2,
            icon_1: i1,
            icon_2: i2,
        });

        try {
            newCaro.save().catch(error => console.error("Failed to save map :", error));
            User.findByIdAndUpdate(newCaro.player_1._id, { onGame: newCaro._id })
                .catch(error => console.error("Failed to update player 1:", error));
            User.findByIdAndUpdate(newCaro.player_2._id, { onGame: newCaro._id })
                .catch(error => console.error("Failed to update player 2:", error));
            sockets[0].emit("found game", newCaro._id);
            sockets[1].emit("found game", newCaro._id);
            sockets[0].disconnect();
            sockets[1].disconnect();

        } catch (error) {
            console.error("create game caro fail : ", error)
        }
    }
})

const socket_sendMove = asyncHandler(async (vty, vtx, match_id, player_id, socket) => {
    if (!player_id) {
        return socket.emit('moveError', { error: 'invalid input parameters' });
    }
    try {
        const caro = await Caro.findById(match_id);
        if (caro) {
            const d = new Date();
            const t = d.getTime();
            const lenMove = caro.moves.length;
            caro.moves[lenMove - 1].push({ vty, vtx });
            if (caro.player_1._id == player_id) {
                caro.timer_1 = caro.timer_1 - (t - caro.start_time);
            }
            else if (caro.player_2._id == player_id) {
                caro.timer_2 = caro.timer_2 - (t - caro.start_time);
            }
            caro.start_time = t;
            caro.save();
            socket.to(match_id).emit("given move", vty, vtx, t);
            return socket.emit('moveSuccess', vty, vtx, t);

        } else {
            return socket.emit('moveError', { error: 'player not found' });

        }


    } catch (error) {
        return socket.emit('moveError', { error: 'an error occurred from try - catch' });
    }

})

const finishGame = asyncHandler(async (match_id, message, id_1, id_2, io, socket) => {
    if (message === "leave") {
        console.log(id_1, "  ", id_2);

        User.findByIdAndUpdate(id_1, { onGame: null })
            .catch(error => console.error("Failed to update player 1:", error));
        User.findByIdAndUpdate(id_2, { onGame: null })
            .catch(error => console.error("Failed to update player 2:", error));

        io.to(match_id).emit("offline", "leave");
    }
    else if (message === "again") {
        socket.to(match_id).emit("offline", "again");
    }
    else if (message === "agree") {
        const caro = await Caro.findById(match_id).populate("player_1").populate("player_2");

        const d = new Date();
        const time = d.getTime();
        caro.start_time = time;
        caro.timer_1 = 300000;
        caro.timer_2 = 300000;

        caro.moves.push([]);
        caro.save().catch(error => console.error("Failed to update player 2:", error));;
        io.to(match_id).emit('start game', {
            caro: caro,
            time: time,
            game: caro.moves.length - 1,
        });
    }

})

const joinRoom = asyncHandler(async (match_id, id1, pass, icon, socket, io) => {
    console.log(" nuaw : ", icon)
    const caro = await Caro.findById(match_id).populate("player_1").populate("player_2");
    if (!caro) {
        return;
    }
    if (caro.player_1 && !caro.player_2) {
        if (caro.player_1._id == id1) {
            console.log("friend find")
            socket.join(match_id);
            caro.icon_1 = icon;
            socket.emit('start game', {
                caro: caro,
                content: 'FriendFind',
            });
            caro.save();
        }
        else if (pass) {
            if (pass == caro.pass) {
                const user = await User.findById(id1);
                socket.join(match_id);
                const d = new Date();
                const time = d.getTime();
                caro.start_time = time;
                caro.icon_2 = icon;
                caro.player_2 = user;
                console.log("icon 2 : ", icon)

                console.log("car : ", caro.player_2)
                caro.save();
                io.to(match_id).emit('start game', {
                    caro: caro,
                    time: time,
                    game: 0,
                });
            }
            else {
                socket.emit('start game', {
                    pass: -1,

                })
            }

        }
        else {
            socket.emit('start game', {
                content: 'FriendWait',

            })
        }
        return;
    }

    if (caro.player_2 && !caro.player_1) {
        console.log("why2 : ", caro.player_2._id, " : ", id1);
        if (caro.player_2._id == id1) {
            console.log("friend find")
            socket.join(match_id);
            caro.icon_2 = icon;
            socket.emit('start game', {
                caro: caro,
                content: 'FriendFind',
            })
            caro.save();
        }
        else if (pass) {
            if (pass == caro.pass) {
                const user = await User.findById(id1);
                console.log("icon 1 : ", icon)
                socket.join(match_id);
                const d = new Date();
                const time = d.getTime();
                caro.start_time = time;
                caro.player_1 = user;
                caro.icon_1 = icon;

                console.log("car : ", caro.player_1)
                caro.save();
                io.to(match_id).emit('start game', {
                    caro: caro,
                    time: time,
                    game: 0,
                });
            }
            else {
                socket.emit('start game', {
                    pass: -1,

                })
            }

        }
        else {
            socket.emit('start game', {
                content: 'FriendWait',

            })
        }
        return;
    }

    socket.join(match_id);


    const sockets = await io.in(match_id).fetchSockets();
    console.log('ja ', sockets.length);


    if (sockets.length = 2 && !caro.start_time) {
        const d = new Date();
        const time = d.getTime();
        caro.start_time = time;
        caro.save();

        io.to(match_id).emit('start game', {
            caro: caro,
            time: time,
            game: 0,
        });

    }
    else if (caro.start_time) {
        socket.emit('start game', {
            caro: caro,
            game: caro.moves.length - 1,
        })
    }

});

module.exports = { socket_sendMove, checkMatch, finishGame, joinRoom }