import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FriendFind = ({ pass }) => {
    const [path, setPath] = useState("https://florencaro.onrender.com" + useLocation().pathname + '/' + pass);
    const handleCopy = (e) => {
        navigator.clipboard.writeText(path).then(() => {
            toast('🦄 copy successfully!', {
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
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };
    return (
        <>
            <ToastContainer />
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-cover bg-center "
                style={{ backgroundImage: `url('https://i.pinimg.com/736x/2a/56/18/2a561869fe24447d8012a9b7b9910853.jpg')` }}>
                <div className="text-center p-8 bg-white rounded shadow-lg">
                    <h3 className="mb-4 text-lg font-semibold text-gray-700">Share this link address with your friend</h3>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleCopy();
                        }}
                        id="FriendFind"
                        className="block focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                    >
                        {path}
                    </button>
                </div>
            </div>
        </>
    )

}
export default FriendFind;