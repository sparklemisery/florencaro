import React, { useState } from "react";
import { useParams } from 'react-router-dom';

const FriendWait = ({ socket, user_id }) => {
    const { id, pass } = useParams();
    const [pw, setPw] = useState(pass)
    const icon = localStorage.getItem("icon") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUwq3CUAjVh2J3JUQ2UFWLZTIrJrZxzMP2fw&s";


    return (

        <>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url('https://i.pinimg.com/736x/2a/56/18/2a561869fe24447d8012a9b7b9910853.jpg')` }}>
                <div className="text-center p-8 bg-white rounded shadow-lg">
                    <div class="relative h-10 w-full min-w-[200px]">
                        <input
                            onChange={(e) => {
                                setPw(e.target.value);
                            }}
                            value={pw || ''}
                            class="peer h-full w-full rounded-[7px] border border-red-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-red-500 placeholder-shown:border-t-red-500 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />

                        <label
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-red-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-red-500 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-red-500 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-red-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            room pass
                        </label>
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        socket.emit('join room', { match_id: id, id1: user_id, pass: pw, icon });



                    }} class="block focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">play</button>
                </div>
            </div>
        </>
    )

}
export default FriendWait;