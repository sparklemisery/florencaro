import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { InfoState } from "../Context/ContextProvider";
import { login } from "../reducers/userReducer";

const NickName = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(useSelector((state) => state.auth.userInfo._id))



    const avatar = [
        "https://i.pinimg.com/736x/95/f7/6c/95f76c94369f51484ff2c1ea6573c71b.jpg",
        "https://i.pinimg.com/564x/3b/5d/3b/3b5d3b57635f9ed7b69cc2a56f066d61.jpg",
        "https://i.pinimg.com/564x/e6/3e/c7/e63ec7444548659ae9057c01bacc5f10.jpg",
        "https://i.pinimg.com/564x/ec/27/aa/ec27aab62a1d77d740af386b8fb7c77f.jpg",
        "https://i.pinimg.com/564x/4e/37/c9/4e37c99545ff7fa87d671bd265090b26.jpg",
        "https://i.pinimg.com/564x/12/a9/bb/12a9bb01a93cd43d4e906e069352511f.jpg",
        "https://i.pinimg.com/564x/23/89/29/23892966d4db54e33f9dc2efaffbea58.jpg",
        "https://i.pinimg.com/564x/02/d4/9c/02d49cfe487c6ef9a05d2bb1c5ad01cd.jpg",
        "https://i.pinimg.com/736x/47/f9/cf/47f9cfe3042b5eddd271781805a9bd88.jpg",
        "https://i.pinimg.com/564x/9a/a1/2a/9aa12a58a0083bff55113bfc20668f90.jpg",
    ];
    const [nickname, setNickname] = useState("");
    const [pic, setPic] = useState(avatar[Math.floor(Math.random() * avatar.length)]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {

        if (auth) {
            navigate("/");
        }

    })



    console.log(pic)

    const changePic = () => {
        setPic(avatar[Math.floor(Math.random() * avatar.length)]);
    }
    const summitHandler = async (e) => {
        e.preventDefault();
        if (!nickname) {
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                { nickname, pic },
                config
            )
            if (data) {
                console.log("login : ", data)
                dispatch(login(data));
                navigate("/");
            }
            console.log(data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    return (
        <>
            <div class="flex justify-center items-center h-screen text-base">
                <div><img className="w-20 h-20 rounded-full object-cover" src={pic} onClick={() => {
                    changePic();
                }} /></div>
                <div class="relative w-96 min-w-[200px] h-10">
                    <form action="">
                        <input onChange={(e) => {
                            setNickname(e.target.value);
                        }}
                            class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
                            placeholder=" " /><label
                                class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
                            enter your
                            nickname
                        </label>

                    </form>
                </div>
                {loading ? <div class='flex items-center justify-center min-h-screen  text-base'>
                    <button type="button" class="bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]" disabled>
                        <div class="flex items-center justify-center m-[10px]">
                            <div class="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                            <div class="ml-2"> saving... </div>
                        </div>
                    </button>
                </div> : <button class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={(e) => {
                    summitHandler(e);
                    setLoading(true);

                }}>send</button>}

            </div>
        </>
    )
}

export default NickName;