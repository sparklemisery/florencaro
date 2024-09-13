import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const listIcon = [
    ["https://media.tenor.com/zVvViQKqa0MAAAAi/psybirdb1oom.gif", "pussy cat"],
    ["https://media.tenor.com/sRL5jAfDjMcAAAAi/flame-lit.gif", "fucking hot"],
    ["https://media1.tenor.com/m/LZljXaTaARAAAAAC/felipedevicente-pixelart.gif", "lgbt"],
    ["https://media.tenor.com/9nBgEcu8e2IAAAAi/charizard-pokemon.gif", " G-dragon"],
    ["https://media1.tenor.com/m/y0HnKKbCPAoAAAAC/duck-dancing-duck.gif", "goosemagusi"],
    ["https://media.tenor.com/uX1jpz5E4lcAAAAi/bmo-bounce.gif", "cyborg"],
    ["https://media.tenor.com/TW3seTwq4RoAAAAi/bexautumn-kiss.gif", "horny girl "],
    ["https://media.tenor.com/oCunlz5KdXkAAAAi/glitter-lucky-pixel-gif.gif", "fight or fly"],
]
let isRunning = false;
const createCaro = async (time, turn, first, id1, navigate) => {
    try {
        console.log("send request")
        const icon = localStorage.getItem("icon") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUwq3CUAjVh2J3JUQ2UFWLZTIrJrZxzMP2fw&s";
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const pass = Math.floor(Math.random() * 900 + 100);
        const { data } = await axios.post(
            "/api/caro/friend",
            { time, turn, first, id1, pass, icon },
            config
        );
        console.log("friend match : ", data)
        navigate(`/caro/r/${data.match_id}`);
    } catch (error) {
        console.log(error)
    }
}
function handleHover(e, action) {
    const btn1 = document.getElementById("1");
    const btn2 = document.getElementById("2");
    const btn3 = document.getElementById("3");
    const btn4 = document.getElementById("4");

    if (action === "expand") {

        if (btn1 === e.target) {
            btn1.style.width = "240px";
            btn1.style.height = "240px";
            btn2.style.width = "144px";
            btn2.style.height = "240px";
            btn3.style.width = "240px";
            btn3.style.height = "144px"
            btn4.style.width = "144px";
            btn4.style.height = "144px";
        } else if (btn2 === e.target) {
            btn2.style.width = "240px";
            btn2.style.height = "240px";
            btn1.style.width = "144px";
            btn1.style.height = "240px";
            btn4.style.width = "240px";
            btn4.style.height = "144px"
            btn3.style.width = "144px";
            btn3.style.height = "144px";
        } else if (btn3 === e.target) {
            btn3.style.width = "240px";
            btn3.style.height = "240px";
            btn4.style.width = "144px";
            btn4.style.height = "240px";
            btn1.style.width = "240px";
            btn1.style.height = "144px"
            btn2.style.width = "144px";
            btn2.style.height = "144px";
        } else if (btn4 === e.target) {
            btn4.style.width = "240px";
            btn4.style.height = "240px";
            btn3.style.width = "144px";
            btn3.style.height = "240px";
            btn2.style.width = "240px";
            btn2.style.height = "144px"
            btn1.style.width = "144px";
            btn1.style.height = "144px";
        }
    } else if (action === "shrink") {


        btn1.style.width = "192px";
        btn1.style.height = "192px";
        btn2.style.width = "192px";
        btn2.style.height = "192px";
        btn3.style.width = "192px";
        btn3.style.height = "192px";
        btn4.style.width = "192px";
        btn4.style.height = "192px";

    }
}



const CaroPage = () => {
    const [id1, setId1] = useState(useSelector((state) => state.auth.userInfo._id));
    const [size, setSize] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isIconOpen, setIsIconOpen] = useState(false)
    const [time, setTime] = useState(5);
    const [turn, setTurn] = useState(40);
    const [first, setFirst] = useState(0);
    const navigate = useNavigate();
    console.log("time : ", time)


    useEffect(() => {
        isRunning = true;
        let n_stars = 150;
        let colors = ['#176ab6', '#fb9b39'];
        for (let i = 0; i < 98; i++) {
            colors.push('#fff');
        }

        const canvas = document.querySelector('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const resizeHandler = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = [];
            init();
        };

        window.addEventListener('resize', resizeHandler);

        canvas.style.background = '#000';
        const c = canvas.getContext('2d');

        const randomInt = (max, min) => Math.floor(Math.random() * (max - min) + min);

        const bg = c.createRadialGradient(canvas.width / 2, canvas.height * 3, canvas.height, canvas.width / 2, canvas.height, canvas.height * 4);
        bg.addColorStop(0, "#32465E");
        bg.addColorStop(0.4, "#000814");
        bg.addColorStop(0.8, "#000814");
        bg.addColorStop(1, "#000");

        class Star {
            constructor(x, y, radius, color) {
                this.x = x || randomInt(0, canvas.width);
                this.y = y || randomInt(0, canvas.height);
                this.radius = radius || Math.random() * 1.1;
                this.color = color || colors[randomInt(0, colors.length)];
                this.dy = -Math.random() * 0.3;
            }
            draw() {
                console.log("run")
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                c.shadowBlur = randomInt(3, 15);
                c.shadowColor = this.color;
                c.strokeStyle = this.color;
                c.fillStyle = 'rgba(255, 255, 255, 0.5)';
                c.fill();
                c.stroke();
                c.closePath();
            }
            update(arrayStars = []) {

                if (this.y - this.radius < 0) this.createNewStar(arrayStars);

                this.y += this.dy;
                this.draw();


            }
            createNewStar(arrayStars = []) {
                const i = arrayStars.indexOf(this);
                arrayStars.splice(i, 1);
                arrayStars.push(new Star(false, canvas.height + 5));
            }
        }

        let stars = [];
        const init = () => {
            for (let i = 0; i < n_stars; i++) {
                stars.push(new Star());
            }
        };
        init();
        let animationFrameId;
        let animate = () => {
            if (!isRunning) return;
            console.log("white long")
            animationFrameId = requestAnimationFrame(animate);
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.fillStyle = bg;
            c.fillRect(0, 0, canvas.width, canvas.height);
            stars.forEach(s => s.update(stars));
        };
        animate();

        return () => {
            isRunning = false;

        };
    }, []);







    return (
        <div >
            <ToastContainer />
            <div class="fixed left-0 right-0 top-0 flex h-screen justify-center items-center font-saira">
                <div class=" w-100 h-100 z-10">
                    <button id="1" onMouseEnter={(e) => handleHover(e, "expand")}
                        onMouseLeave={(e) => handleHover(e, "shrink")} onClick={(e) => {


                            e.preventDefault();
                            navigate("/caro/f/1");
                        }} class="inline-block w-48 m-1 h-48 bg-white/20 backdrop-blur-[2px] text-white rounded-lg transition-all duration-300">Find game</button>
                    <button id="2" onMouseEnter={(e) => handleHover(e, "expand")}
                        onMouseLeave={(e) => handleHover(e, "shrink")} onClick={(e) => {
                            e.preventDefault();
                            setIsModalOpen(true);
                        }} class="inline-block w-48 h-48 m-1 bg-green-400/50 backdrop-blur-[2px] text-white rounded-lg transition-all duration-300">Create match</button>
                    <button id="3" onMouseEnter={(e) => handleHover(e, "expand")}
                        onMouseLeave={(e) => handleHover(e, "shrink")}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/history");
                        }}
                        class="inline-block w-48 h-48 m-1 bg-blue-500/50 backdrop-blur-[2px] text-white rounded-lg transition-all duration-300">History</button>
                    <button id="4" onMouseEnter={(e) => handleHover(e, "expand")}
                        onMouseLeave={(e) => handleHover(e, "shrink")} onClick={(e) => {

                            e.preventDefault();
                            setIsIconOpen(true);
                        }} class="inline-block w-48 h-48 m-1 bg-purple-500/50 backdrop-blur-[2px] text-white rounded-lg transition-all duration-300 ">Icon</button>
                </div>
            </div>
            <div class="h-screen">
                <canvas class="block"></canvas>
            </div>



            {
                isModalOpen ? <div id="crud-modal" tabindex="-1" class="bg-stone-100 bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center" onClick={(e) => {
                    e.preventDefault();
                    if (e.target.id == "crud-modal") {
                        setIsModalOpen(false);
                    }

                }}>
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    play with bro
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={(e) => {
                                    e.preventDefault();
                                    setIsModalOpen(false)

                                }}>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </div>

                            <form class="p-4 md:p-5">
                                <div class="grid gap-4 mb-4 grid-cols-2">
                                    <div class="col-span-2">
                                        <label for="game" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Game</label>
                                        <select id="game" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="caro">caro</option>
                                            <option value="snake">snake</option>
                                        </select>
                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                        <select id="time" onChange={(e) => {
                                            setTime(e.target.value);
                                        }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="5">5 minutes</option>
                                            <option value="4">4 minutes</option>
                                            <option value="3">3 minutes</option>
                                            <option value="2">2 minutes</option>
                                        </select>
                                    </div>
                                    <div class="col-span-2 sm:col-span-1">
                                        <label for="turn" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turn</label>
                                        <select id="turn" onChange={(e) => {
                                            setTurn(e.target.value);
                                        }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="40">40 second</option>
                                            <option value="30">30 second</option>
                                            <option value="20">20 second</option>
                                            <option value="15">15 second</option>
                                        </select>
                                    </div>
                                    <div class="col-span-2">
                                        <label for="first" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Game</label>
                                        <select id="first" onChange={(e) => {
                                            setFirst(e.target.value);
                                        }} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="0">random</option>
                                            <option value="1">you play first</option>
                                            <option value="2">friend play first</option>
                                        </select>
                                    </div>

                                </div>
                                <div class="flex flex-row-reverse">
                                    <button type="submit" onClick={(e) => {
                                        e.preventDefault();
                                        createCaro(time, turn, first, id1, navigate);
                                    }} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                                        Continue
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                                        </svg>
                                    </button>

                                </div>

                            </form>
                        </div>

                    </div>
                </div> : null
            }
            {
                isIconOpen ? <div id="crypto-modal" tabindex="-1" aria-hidden="true" class="bg-stone-100 bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center" onClick={(e) => {
                    e.preventDefault();
                    if (e.target.id == "crypto-modal") {
                        setIsIconOpen(false);
                    }
                }}>
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Icon Display Table
                                </h3>
                                <button type="button" onClick={(e) => {
                                    e.preventDefault();
                                    setIsIconOpen(false);
                                }} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crypto-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5">
                                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
                                <ul class="my-4 space-y-3 " style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {Array.from((listIcon), (x) => (
                                        <li onClick={() => {
                                            localStorage.setItem("icon", x[0]);
                                            toast('🦄 chose icon successfully', {
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

                                        }}>
                                            <a href="#" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                <img src={x[0]} width="35" height="35" />
                                                <span class="flex-1 ms-3 whitespace-nowrap">{x[1]}</span>
                                            </a>
                                        </li>
                                    ))}


                                </ul>
                                <div>
                                    <a href="#" class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                                        <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        Why do I need to connect with my wallet?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null
            }



        </div>


    )


}

export default CaroPage