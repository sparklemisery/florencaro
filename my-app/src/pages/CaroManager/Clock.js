import './CaroMatch.css';
import React, { useEffect, useState } from 'react';



//name have issues 

const Clock = ({ time_remain, count_time, begin_time, circlePin, run, champion, game, socket, turn, match_id }) => {
    const [count, setCount] = useState(count_time);//problem initial count_time
    const [circle, setCircle] = useState(0);


    console.log("hoa vo sac : ", count_time);



    useEffect(() => {
        console.log("tooi da khoc")
        var firstTime = null;
        var secondTime = null;
        var circleTime = null;
        var cirCleTimeFirst = null
        var dm = null;
        const checkEnd = () => {
            if (socket) {
                socket.emit("end game", { match_id });
                champion("lose");
            }
        }
        const stopInterval = () => {
            setCount(count_time);

            const infinite = document.getElementById(circlePin);
            if (infinite != null) {
                infinite.classList.remove("circular-progress");
            }

            clearTimeout(firstTime);
            clearInterval(secondTime);
            clearInterval(circleTime);
            clearInterval(cirCleTimeFirst);

            firstTime = null;
            secondTime = null;
        }
        const startInterval = () => {
            const infinite = document.getElementById(circlePin);
            var remain = null;

            setCircle(() => {
                setCount(count_time)
                console.log("count time : ", count_time);

                const abc = turn - (new Date()).getTime() + begin_time;
                const duration = abc / 1000;
                remain = abc % 1000;
                const distance = (turn - abc) / turn * 100;
                console.log("dis - dur : ", distance, duration);
                infinite.style.setProperty('--duration', duration + 's');
                infinite.style.setProperty('--distance', distance);
                infinite.classList.add("circular-progress");
                console.log("so qua di : ", abc)
                return abc;
            })

            cirCleTimeFirst = setTimeout(() => {
                setCircle(prev => {
                    if (prev - remain <= 0) {
                        checkEnd();
                    }
                    else {
                        circleTime = setInterval(() => {
                            setCircle((prev) => {
                                console.log("oi ban ooiiiiii   ", prev)
                                if (prev - 1000 <= 0) {
                                    checkEnd();
                                    stopInterval();
                                }
                                return prev - 1000;
                            })
                        }, 1000)
                    }
                    return prev - remain;
                })


            }, remain)


            firstTime = setTimeout(() => {
                console.log(time_remain)
                setCount(prev => {
                    if (prev - time_remain <= 0) {
                        checkEnd();
                    } else {
                        secondTime = setInterval(() => {

                            setCount(prev => {
                                if (prev <= 1000) {
                                    checkEnd();
                                    stopInterval();

                                }
                                return prev - 1000
                            });

                        }, 1000);
                    }

                    return prev - time_remain;
                });

            }, time_remain);

            console.log("ai veeeee : ",)

        }
        if (run) {
            console.log("chay di bro")
            startInterval();
        }
        else {
            stopInterval();
        }
        return () => {
            stopInterval();
        }

    }, [run, game]);




    return (

        <p className='text-base'>{Math.floor(count / 60000)}:{Math.ceil((count % 60000) / 1000)}</p>

    )
}
export default Clock;