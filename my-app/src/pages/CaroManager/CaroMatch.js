import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CaroMatch.css';
import Clock from './Clock';
import EndGame from './EndGame';
import FriendFind from './FriendFind';
import FriendWait from './FriendWait';

const ENDPOINT = "https://florencaro.onrender.com";
var socket;
var flag = false;

const size = 16;

var matrix = null;

var nick1;
var pic1;
var nick2;
var pic2;
var icon1;
var icon2;
var id1;
var id2;

//win check
var check = (y, x) => {
    console.log("matrix ", matrix[y][x])

    let county = y;
    let countx = x;
    let total = 1;
    while (countx + 1 < size && matrix[county][countx + 1] == matrix[y][x]) {
        total++;
        countx++;
    }
    county = y;
    countx = x;
    while (countx - 1 >= 0 && matrix[county][countx - 1] == matrix[y][x]) {
        total++;
        countx--;
    }
    if (total >= 5) {
        return true;
    }
    county = y;
    countx = x;
    total = 1;
    while (county + 1 < size && matrix[county + 1][countx] == matrix[y][x]) {
        total++;
        county++;
    }
    county = y;
    countx = x;
    while (county - 1 >= 0 && matrix[county - 1][countx] == matrix[y][x]) {
        total++;
        county--;
    }
    if (total >= 5) {
        return true;
    }
    county = y;
    countx = x;
    total = 1;
    while (countx + 1 < size && county + 1 < size && matrix[county + 1][countx + 1] == matrix[y][x]) {
        total++;
        countx++;
        county++;
    }
    county = y;
    countx = x;
    while (countx - 1 >= 0 && county - 1 >= 0 && matrix[county - 1][countx - 1] == matrix[y][x]) {
        total++;
        countx--;
        county--;
    }
    if (total >= 5) {
        return true;
    }
    county = y;
    countx = x;
    total = 1;
    while (countx + 1 < size && county - 1 >= 0 && matrix[county - 1][countx + 1] == matrix[y][x]) {
        total++;
        countx++;
        county--;
    }
    county = y;
    countx = x;
    while (countx - 1 >= 0 && county + 1 < size && matrix[county + 1][countx - 1] == matrix[y][x]) {
        total++;
        countx--;
        county++;
    }
    if (total >= 5) {
        return true;
    }
    return false;


};


var champion = null;

const CaroMatch = () => {
    console.log("top god ");

    const navigate = useNavigate();
    const match_id = useParams().id;
    const [userId, setUserId] = useState(useSelector((state) => state.auth.userInfo._id));

    const [time1, setTime1] = useState(300000);
    const [time2, setTime2] = useState(300000);
    const [start, setStart] = useState(0);
    const [count1, setCount1] = useState(300000);
    const [count2, setCount2] = useState(300000);
    const [loading, setLoading] = useState(true);
    const [run1, setRun1] = useState(false);
    const [run2, setRun2] = useState(false);
    const [end, setEnd] = useState(false);
    const [timeleft1, setTimeleft1] = useState();
    const [timeleft2, setTimeleft2] = useState();
    const [game, setGame] = useState(0);
    const [winner, setWinner] = useState();
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [isFriendFind, setIsFriendFind] = useState(false);
    const [isFriendWait, setIsFriendWait] = useState(false);
    const [pass, setPass] = useState();
    const [turn, setTurn] = useState();
    console.log("time left : ", timeleft1, "  ", timeleft2)
    console.log("time34  : ", time1, "  ", time2)




    useEffect(() => {
        socket = io(ENDPOINT, { withCredentials: true, });
        const icon = localStorage.getItem("icon") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxtOsvR4mTPFRQWBgkLD20taZHtg1WTN0VA&s";


        socket.emit("join room", { match_id, id1: userId, icon })
        champion = (winner) => {
            socket.removeAllListeners('given move');
            socket.removeAllListeners('moveSuccess');
            socket.removeAllListeners('end game');


            socket.on("start game", onStartGame)
            if (winner === "win") {
                if (userId == id1) {
                    setScore1(prev => prev + 1);
                }

                else {
                    setScore2(prev => prev + 1);
                }

            }
            else {
                if (userId == id1) {
                    setScore2(prev => prev + 1);
                }
                else {
                    setScore1(prev => prev + 1);
                }

            }

            setWinner(winner);
            setEnd(true);
            setRun1(false);
            setRun2(false);
        }

        function createMap(x) {
            console.log("create map");
            const container = document.getElementById('map-play');
            console.log("container : ", container)
            var table = document.querySelector('table');
            if (table) {
                table.innerHTML = '';


            }
            else {
                table = document.createElement('table')
            }

            for (let i = 0; i < x; i++) {
                var row = document.createElement('tr');
                for (let j = 0; j < x; j++) {
                    const cell = document.createElement('td');
                    cell.classList.add('border', 'border-slate-300');
                    cell.id = `${i}-${j}`;
                    cell.style.width = '35px';
                    cell.style.height = '35px';


                    cell.addEventListener('click', async function () {
                        console.log("why not me : ", matrix[i][j])
                        if (!navigator.onLine) {
                            document.getElementById('spinnerOverlay').classList.remove('hidden');
                        }
                        else if (matrix[i][j] == 0 && flag) {
                            console.log("oke bro");
                            const img = document.createElement('img');
                            if (userId == id1) {
                                img.src = icon1;
                            } else if (userId == id2) {
                                img.src = icon2;
                            }

                            img.style.width = '35px';
                            img.style.height = '35px';
                            img.style.objectFit = 'cover';

                            // Append the image to the cell
                            cell.appendChild(img);
                            if (userId == id1) {
                                matrix[i][j] = 1;
                            }
                            else if (userId == id2) {
                                matrix[i][j] = 2;
                            }
                            console.log("user : ", userId, " oke : ", id1)
                            socket.emit('moveAction', match_id, i, j, userId);
                            console.log(matrix);
                            flag = false;



                        }

                    })

                    row.appendChild(cell);

                }
                table.appendChild(row);
            }
            table.classList.add('border-collapse', 'border', 'border-slate-400');
            container.appendChild(table);



        }

        const fetchData = (data) => {
            console.log("this is data match : ", matrix);
            let grade1 = 0;
            let grade2 = 0;
            if (data) {
                if (data.game % 2 == 0) {
                    var even = 0;
                }
                else {
                    even = 1;
                }
                for (const move of data.caro.moves[data.game]) {
                    console.log("move ", move);
                    const cell = document.getElementById(`${move.vty}-${move.vtx}`);
                    if (even % 2 == 0) {
                        const img = document.createElement('img');
                        console.log("iocn 1 : ", data.caro.icon_1);
                        img.src = data.caro.icon_1;
                        img.style.width = '35px';
                        img.style.height = '35px';
                        img.style.objectFit = 'cover';
                        matrix[move.vty][move.vtx] = 1;
                        cell.appendChild(img);
                    }
                    else {
                        const img = document.createElement('img');
                        img.src = data.caro.icon_2;
                        img.style.width = '35px';
                        img.style.height = '35px';
                        img.style.objectFit = 'cover';
                        matrix[move.vty][move.vtx] = 2;
                        cell.appendChild(img);
                    }
                    even++;
                }
                let moves = data.caro.moves;
                for (let i = 0; i < moves.length - 1; i++) {
                    if (i % 2 == 0) {
                        if (moves[i].length % 2 == 0) {
                            grade2++;
                        }
                        else {
                            grade1++;
                        }
                    }
                    else {
                        if (moves[i].length % 2 == 0) {
                            grade1++;
                        }
                        else {
                            grade2++;
                        }
                    }
                }
                nick1 = data.caro.player_1.nickname;
                nick2 = data.caro.player_2.nickname;
                pic1 = data.caro.player_1.pic;
                pic2 = data.caro.player_2.pic;
                id1 = data.caro.player_1._id;
                id2 = data.caro.player_2._id;
                icon1 = data.caro.icon_1;
                icon2 = data.caro.icon_2;
                setScore1(grade1);
                setScore2(grade2);
                setGame(data.game);
                setTurn(data.caro.turn);
                const d = new Date();
                const time = d.getTime();
                const start_time = data.time == null ? data.caro.start_time : data.time;

                setTime1(data.caro.timer_1);
                setTime2(data.caro.timer_2);
                setStart(start_time);

                if ((data.game % 2 == 0 && data.caro.moves[data.game].length % 2 == 0) || (data.game % 2 == 1 && data.caro.moves[data.game].length % 2 == 1)) {

                    const duration = data.caro.timer_1 - (time - start_time);
                    if (userId == data.caro.player_1._id) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                    setCount1(duration);
                    setCount2(data.caro.timer_2);
                    setTimeleft1(duration % 1000);
                    setTimeleft2(data.caro.timer_2 % 1000);
                    setRun1(true);
                    setRun2(false);
                }
                else if ((data.game % 2 == 0 && data.caro.moves[data.game].length % 2 == 1) || (data.game % 2 == 1 && data.caro.moves[data.game].length % 2 == 0)) {
                    const duration = data.caro.timer_2 - (time - start_time);
                    if (userId == data.caro.player_2._id) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                    setCount2(duration);
                    setCount1(data.caro.timer_1);
                    setTimeleft2(duration % 1000);
                    setTimeleft1(data.caro.timer_1 % 1000);
                    setRun2(true);
                    setRun1(false);
                }
            }

        }

        const onStartGame = (data) => {
            console.log("dm cm may tk loll : ", data);

            if (data.content && data.content == 'FriendFind') {
                setIsFriendFind(true);
                setPass(data.caro.pass);

                return;

            }
            if (data.content && data.content == 'FriendWait') {
                setIsFriendWait(true);

                return;
            }
            if (data.pass && data.pass == -1) {
                console.log(" oi dcm cuoc doi toi")
                toast('🦄 pass failure!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
                return;

            }
            socket.on('given move', (vty, vtx, t) => {

                let cell = document.getElementById(`${vty}-${vtx}`);
                const img = document.createElement('img');
                if (userId == id1) {
                    matrix[vty][vtx] = 2;
                    img.src = icon2;
                }
                else if (userId == id2) {
                    matrix[vty][vtx] = 1;
                    img.src = icon1;
                }
                img.style.width = '35px';
                img.style.height = '35px';
                img.style.objectFit = 'cover';
                cell.appendChild(img);

                if (check(vty, vtx)) {
                    champion("lose");
                    return;
                };

                flag = true;
                if (userId == id1) {
                    setStart((prev1) => {
                        const duration = t - prev1;
                        setTime1((prev) => {
                            let tg = prev - ((new Date()).getTime() - t);
                            setCount1(tg);
                            setTimeleft1(tg % 1000);
                            return prev;
                        })
                        setTime2((prev) => {
                            setTimeleft2((prev - duration) % 1000)
                            console.log("timeleft 2 : ", timeleft2);
                            setCount2(prev - duration);
                            return prev - duration;
                        });
                        return t;
                    });
                    setRun1(true);
                    setRun2(false);
                } else if (userId == id2) {
                    setStart((prev1) => {
                        const duration = t - prev1;
                        setTime2((prev) => {
                            let tg = prev - ((new Date()).getTime() - t);
                            setCount2(tg);
                            setTimeleft2(tg % 1000);
                            return prev;
                        })
                        setTime1((prev) => {
                            setTimeleft1((prev - duration) % 1000)
                            console.log("timeleft 2 : ", timeleft2);
                            setCount1(prev - duration);
                            return prev - duration;
                        });
                        return t;
                    });
                    setRun2(true);
                    setRun1(false);
                }



            })
            socket.on('moveSuccess', (vty, vtx, t) => {
                if (check(vty, vtx)) {

                    champion("win");
                    return;
                }


                if (userId == id1) {
                    console.log("oi dit  me cuoc doi toi");

                    setStart((prev1) => {
                        const duration = t - prev1;
                        setTime2((prev) => {
                            let tg = prev - ((new Date()).getTime() - t);
                            setCount2(tg);
                            setTimeleft2(tg % 1000);
                            return prev;
                        })
                        setTime1((prev) => {
                            setTimeleft1((prev - duration) % 1000)
                            const newTime = prev - duration;
                            console.log("new time : ", prev);
                            setCount1(newTime);
                            return newTime;
                        });

                        return t;
                    });
                    setRun2(true);
                    setRun1(false);
                } else if (userId == id2) {
                    setStart((prev1) => {
                        const duration = t - prev1;
                        setTime1((prev) => {
                            let tg = prev - ((new Date()).getTime() - t);
                            setCount1(tg);
                            setTimeleft1(tg % 1000);
                            return prev;
                        })
                        setTime2((prev) => {
                            setTimeleft2((prev - duration) % 1000)
                            const newTime = prev - duration;
                            console.log("new time : ", newTime);
                            setCount2(newTime);
                            return newTime;
                        });
                        return t;
                    });
                    setRun1(true);
                    setRun2(false);
                }


                toast('🦄 move successfully!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            })
            socket.on("end game", () => {
                champion("win");
            })



            matrix = Array.from({ length: size }, () =>
                new Array(size).fill(0))
            createMap(size);
            setIsFriendFind(false);
            setIsFriendWait(false);
            setEnd(false);
            fetchData(data);
            setLoading(false);
            console.log("after fetch data");
            socket.off('start game', onStartGame);
        };

        socket.on('start game', onStartGame)


        window.addEventListener('online', () => {
            socket.emit("join room", match_id, id1);
            console.log("fetch window");
            setLoading(false);

        })
        window.addEventListener('offline', () => {
            console.log("fetch widnow offline");
            setLoading(true)
        })


        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <div>
            <ToastContainer />

            {isFriendFind ? <FriendFind pass={pass} />
                : (isFriendWait ? <FriendWait socket={socket} user_id={userId} /> : (loading ?
                    <div id="spinnerOverlay" class=" fixed inset-0 bg-stone-100 bg-opacity-75 flex flex-col items-center justify-center z-50">
                        <div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-white border-t-transparent"></div>
                        <h3>Loading...</h3>
                    </div> :
                    <>
                        <div className='flex justify-center my-2'>
                            <div className='flex w-60 justify-end'>
                                <div>
                                    <h3>{nick1}</h3>
                                    <Clock time_remain={timeleft1} count_time={count1} begin_time={start} circlePin={"infinite-1"} run={run1} champion={champion} game={game} socket={socket} turn={turn} match_id={match_id} />


                                </div>
                                <div class="relative w-84 h-84">
                                    <svg
                                        width="84" height="84" viewBox="0 0 84 84" class=" absolute left-0 top-0" id="infinite-1"
                                    >

                                        <circle className="bg"
                                        />
                                        <circle className="fg"
                                        />

                                    </svg>
                                    <div class="overflow-hidden rounded-full absolute w-16 h-16 top-2.5 left-2.5">
                                        <img src={pic1} class="w-16 h-16 object-cover transition-transform duration-300 ease-in-out transform hover:scale-150" />
                                    </div>
                                </div>
                            </div>
                            <div className='w-16 flex justify-center items-center'><span>{score1}:{score2}</span></div>
                            <div className='flex w-60'>
                                <div class="relative w-84 h-84">

                                    <svg
                                        width="84" height="84" viewBox="0 0 84 84" class="absolute left-0 top-0" id="infinite-2"
                                    >

                                        <circle className="bg"
                                        />
                                        <circle className="fg"
                                        />

                                    </svg>
                                    <div class="overflow-hidden rounded-full absolute w-16 h-16 top-2.5 left-2.5">
                                        <img src={pic2} class="w-16 h-16 object-cover transition-transform duration-300 ease-in-out transform hover:scale-150" />
                                    </div>
                                </div>
                                <div>
                                    <h3>{nick2}</h3>

                                    <Clock time_remain={timeleft2} count_time={count2} begin_time={start} circlePin={"infinite-2"} run={run2} champion={champion} game={game} turn={turn} match_id={match_id} />

                                </div>
                            </div>
                        </div>







                    </>

                ))}
            <div id="map-play" className="flex justify-center">
            </div>


            {end ? <EndGame socket={socket} match_id={match_id} id1={id1} id2={id2} winner={winner} /> : null}
        </div>



    )


}

export default CaroMatch;