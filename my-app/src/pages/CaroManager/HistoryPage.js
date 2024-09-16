import React, { useEffect, useState } from "react";
import axios from "axios";
function HistoryPage() {
    const [matches, setMatches] = useState();
    const [layer, setLayer] = useState(5);
    const [start, setStart] = useState(1);
    let element = document.getElementById("dropdown");
    if (element) {
        element.classList.add("hidden");
    }
    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await axios.get(
                    "/api/user/history",

                );
                const { data } = response;
                if (data) {
                    setMatches(data);
                    console.log("history : ", data);

                }
            } catch (error) {
                console.log(error);

            }

        }
        getHistory();


    }, [])

    return (
        <div class="relative">
            <img class="absolute inset-x-0 w-full" src="https://i.pinimg.com/originals/1d/c0/84/1dc0848d2b97bd80341375ffb971d3f8.jpg" />
            {matches ?
                <div class="relative">
                    <div class="flex justify-center ">
                        <div class="w-[700px] mt-[100px] relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Player
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Score
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Time Start
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {matches.length > 0 ? (matches.map((item, index) => {
                                        if (index >= start - 1 && index < start + layer - 1) {
                                            let score1 = 0;
                                            let score2 = 0;

                                            return <tr class="bg-white/60 backdrop-blur-sm text-gray-900 border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" class="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
                                                    {item.player_1.nickname ? item.player_1.nickname : null} <br></br> {item.player_2.nickname ? item.player_2.nickname : null}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {item.moves.map((move, index) => {
                                                        if ((index % 2 == 0 && move.length % 2 == 0) || (index % 2 == 1 && move.length % 2 == 1)) {
                                                            score2++;

                                                        }
                                                        else {
                                                            score1++;
                                                        }

                                                    })}
                                                    {score1}<br></br>{score2}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {(new Date(item.start_time)).toLocaleString()}
                                                </td>

                                            </tr>
                                        }

                                    })) : null}


                                </tbody>
                            </table>
                            <div class="h-[50px] bg-slate-500 flex flex-row-reverse items-center">
                                <div class="flex px-2">
                                    <svg onClick={(e) => {
                                        e.preventDefault();
                                        if (start > 1) {
                                            setStart(start - layer < 0 ? 1 : start - layer);
                                        }
                                    }} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                                    </svg>

                                    <svg onClick={(e) => {
                                        e.preventDefault();
                                        if (start + layer - 1 < matches.length) {
                                            setStart(start + layer);
                                        }
                                    }} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                                    </svg>

                                </div>
                                <p class="px-4">{start}-{start + layer - 1 > matches.length ? matches.length : start + layer - 1} of {matches.length}</p>
                                <button id="dropdownDefaultButton" onClick={(e) => {
                                    let element = document.getElementById("dropdown");
                                    let rect = e.currentTarget.getBoundingClientRect();
                                    console.log(rect.right)
                                    if (element.classList.contains('hidden')) {
                                        element.classList.remove('hidden');
                                        element.style.top = `${rect.top + 45}px`;
                                        element.style.left = `${rect.left}px`;
                                    } else {
                                        element.classList.add('hidden');
                                    }


                                }} data-dropdown-toggle="dropdown" class="text-white bg-gray-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">{layer}<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>







                            </div>


                        </div>


                    </div>
                    <div id="dropdown" class="absolute hidden z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-[69px] dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li onClick={(e) => {
                                e.preventDefault();
                                setStart((prev) => {
                                    return prev - (prev % 50) + 1;
                                })
                                setLayer(50);
                            }}>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">50</a>
                            </li>
                            <li onClick={(e) => {
                                e.preventDefault();
                                setStart((prev) => {
                                    return prev - (prev % 20) + 1;
                                })
                                setLayer(20);
                            }}>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">20</a>
                            </li>
                            <li onClick={(e) => {
                                e.preventDefault();
                                setStart((prev) => {
                                    return prev - (prev % 10) + 1;
                                })
                                setLayer(10);
                            }}>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">10</a>
                            </li>
                            <li onClick={(e) => {
                                e.preventDefault();
                                setStart((prev) => {
                                    return prev - (prev % 5) + 1;
                                })
                                setLayer(5);
                            }}>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">5</a>
                            </li>
                        </ul>
                    </div>
                </div>
                : <div class='flex relative items-center justify-center min-h-screen  text-base'>
                    <button type="button" class="bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
                        <div class="flex items-center justify-center m-[10px]">
                            <div class="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                            <div class="ml-2"> Loading... </div>
                        </div>
                    </button>
                </div>}
        </div>
    )
}
export default HistoryPage