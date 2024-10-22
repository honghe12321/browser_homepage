import "../css/clock.css"
import {useEffect, useState} from "react";
const Clock = ()=>{
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return(
        <div className="timeBox">
            <div className="clock" id="clock">
                {time.toLocaleTimeString()}
            </div>
        </div>
    )
}

export default Clock;