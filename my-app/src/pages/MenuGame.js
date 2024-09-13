import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const posters = ["https://i.pinimg.com/originals/33/cc/c0/33ccc01b05dae09546f93cad879e8cec.jpg",
    "https://i.pinimg.com/originals/17/35/08/173508e80d15bbc8cca962861bd9dfcd.jpg",
    "https://i.pinimg.com/originals/0d/49/40/0d49400c2e172f0ecf5374d7d09e6599.jpg",
    "https://i.pinimg.com/originals/09/c7/88/09c7886525bb56608f701f7255b37a93.jpg",
    "https://i.pinimg.com/564x/60/4b/8c/604b8c5d9ca7d306b56e2805ecdcfede.jpg",
    "https://i.pinimg.com/originals/f4/05/8a/f4058a7aaf8347aa9f3c09cbc5da5919.jpg",
    "https://i.pinimg.com/564x/ea/0a/49/ea0a49041ce24f4a8dd8452e5a5b866b.jpg",

]
const titles = ["Caro", "Snake", "RedBlack", "Poker", "Pilot", "Reading", "shadowing"];



const MenuGame = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [game, setGame] = useState();
    const [backgroundImageUrl, setBackgroundImageUrl] = useState();
    console.log("menu bro")
    const navigate = useNavigate();


    const backgroundStyle = {
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1, // Set a lower z-index for the background
        position: 'absolute',
    };
    useEffect(() => {

        const htmlElement = document.querySelector('html');
        htmlElement.style.fontSize = '62.5%';
        setGame(titles[0]);
        setBackgroundImageUrl(posters[0]);
        return () => {

            const htmlElement = document.querySelector('html');

            // Remove the font-size style
            htmlElement.style.removeProperty('font-size');

        }
    }, [])



    return (
        <div class="relative font-saira ">
            <div class="absolute  p-2">
                <img className="w-20 h-20 rounded-full object-cover" src={userInfo.pic} alt="Profile" />
                <h2 className="flex justify-center"> {userInfo.nickname}</h2>
            </div>
            <div class="blur-sm " style={backgroundStyle}></div>;
            <div className="container relative z-10 ">
                {/* if you want set z-index , firstly you shoud set type of position */}
                <h1 className="heading text-white" id="title-game">{game}</h1>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="swiper_container"
                    onSlideChange={(swiper) => {
                        const activeSlide = document.querySelector('.swiper-slide-active');
                        if (activeSlide) {
                            const index = activeSlide.getAttribute('data-swiper-slide-index');
                            console.log("Active slide index:", index);  // Output: 6
                            const game = document.getElementById("title-game");
                            if (posters[index] != backgroundImageUrl) {
                                setBackgroundImageUrl(posters[index]);
                                setGame(titles[index])
                            }



                        }
                    }}
                >
                    {posters.map((item) => {

                        return <SwiperSlide><img onClick={() => {
                            navigate("/caro")
                        }} src={item} /></SwiperSlide>
                    })}

                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            </div>


            {/* <div>
                <div>
                    <img className="w-20 h-20 rounded-full object-cover" src={userInfo.pic} alt="Profile" />
                    <h2>{userInfo.nickname}</h2>
                </div>

                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Game Menu</h2>
                <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
                    <li>
                        <Link to="/caro">Caro</Link>
                    </li>
                    <li>
                        <Link to="/snake">Snake</Link>
                    </li>
                </ul>

            </div> */}

        </div>
    );
};

export default MenuGame;
