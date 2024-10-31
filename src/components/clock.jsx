import "../css/clock.css"
import {useEffect, useState} from "react";
import Tooltip from "../services/Tooltip";

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
                <div className="clock" id="clock">
                    {time}
                </div></div>
)
}

export default Clock;
