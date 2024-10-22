import "../css/clock.css"
import {useEffect, useState} from "react";

const Clock = () => {
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

        <div className="timeBox">
            <div className="clock" id="clock">
                {time}
            </div>
        </div>

    )
}

export default Clock;
