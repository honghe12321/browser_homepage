import "../css/clock.css"
import {useEffect, useState} from "react";

const Clock = ({isImmerseFullscreen}) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
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
