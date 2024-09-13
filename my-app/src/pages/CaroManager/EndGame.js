import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Flip } from 'react-toastify';



const EndGame = ({ socket, match_id, id1, id2, winner }) => {
    console.log("end game oeeeee ", id1, "  ", id2);
    const [count, setCount] = useState(60);
    const [wait, setWait] = useState(false);
    const [again, setAgain] = useState(false);
    const [agree, setAgree] = useState(false);
    const [leave, setLeave] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        document.getElementById("content").innerHTML = 'you ' + winner

        const timeCount = setInterval(() => {
            setCount((prev) => {
                if (prev == 0) {
                    navigate("/");
                }
                return prev - 1;
            });
        }, [1000])
        const afterOffline = (message) => {
            if (message === "leave") {
                setLeave(true);
                toast('🦄 the enemy have already left', {
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
            }
            else if (message === "again") {
                setAgain(true);
                toast('🦄 the enemy want to fight again', {
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


            }

        }

        socket.on("offline", (message) => {
            afterOffline(message);
        })
        return () => {
            console.log(" nguoi choi nay da unmount bullyshit bros")
            clearInterval(timeCount);
            socket.removeAllListeners('offline');
        }

    }, []);



    return (
        <div>
            <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" class="hidden block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button>
            <div id="popup-modal" tabindex="-1" class="bg-stone-100 bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 id='content' class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">you win</h3>
                            <div class="flex flex-col">
                                {!leave ? (wait ? <button type="button" class="text-white bg-blue-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    wait response from enemy
                                </button> : (again ? <button onClick={(e) => {
                                    e.preventDefault();
                                    socket.emit("leave room", { match_id, message: 'agree' })
                                }} type="button" class="text-white bg-red-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    enemy want to fight again
                                </button> : <button onClick={(e) => {
                                    e.preventDefault();
                                    setWait(true);

                                    socket.emit("leave room", { match_id, message: 'again' });


                                }} id="play-again" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Play Again
                                </button>)) : null
                                }




                                <button onClick={(e) => {
                                    e.preventDefault();
                                    socket.emit("leave room", { match_id, message: "leave", id_1: id1, id_2: id2 });
                                    navigate("/");
                                }} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">leave the room
                                    <br />
                                    {count}s
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EndGame;