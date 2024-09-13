import { io } from "socket.io-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ENDPOINT = "http://localhost:6969";
var socket;

const FindMatch = () => {
    console.log("find match")
    const navigate = useNavigate();
    const _id = useSelector((state) => state.auth.userInfo._id);
    useEffect(() => {
        const icon = localStorage.getItem("icon") || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxtOsvR4mTPFRQWBgkLD20taZHtg1WTN0VA&s";

        socket = io(ENDPOINT);
        socket.on("connect", () => {
            console.log("client socket : ", socket.id);
        })
        socket.emit("join game", _id, icon);
        socket.on("found game", (match_id) => {
            navigate(`/caro/r/${match_id}`)
        })
        return () => {
            console.log("find game disconnect")
            socket.disconnect();
        }


    }, [])
    return (
        <>
            <div class='flex items-center justify-center min-h-screen  text-base'>
                <button type="button" class="bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
                    <div class="flex items-center justify-center m-[10px]">
                        <div class="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                        <div class="ml-2"> Finding... </div>
                    </div>
                </button>
            </div>
        </>
    )
}
export default FindMatch;