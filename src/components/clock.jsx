import "../css/clock.css"
import {useEffect, useState} from "react";
function formatDate(date) {
    // const year = date.getFullYear();
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
}

// const now = new Date();
// console.log(formatDate(now)); // 输出格式化后的当前时间
const Clock = ({isImmerseFullscreen}) => {
    const [time, setTime] = useState(formatDate(new Date()));
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(formatDate(new Date()));
        }, 1e3);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (

            <div className={`${!isImmerseFullscreen ? 'timeBox' : 'timeBoxBig'}`}>
                <span id="clock">
                    {time}
                </span>
            </div>
)
}

export default Clock;
