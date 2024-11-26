import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {useAtomValue} from 'jotai'
import {immerseAtom} from '../atoms/fullscreen'
import '../css/clock.css'

function getCurrentTime() {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')

    return {
        hours, minutes, seconds
    }
}

/** function formatDate(date) {
    // const year = date.getFullYear();
    // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    // const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return `${hours}:${minutes}:${seconds}`;
} **/

// const now = new Date();
// console.log(formatDate(now)); // 输出格式化后的当前时间
const Clock = () => {
    const [time, setTime] = useState(getCurrentTime())
    const immerse = useAtomValue(immerseAtom)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getCurrentTime())
        }, 1e3)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={clsx(!immerse ? 'timeBox' : 'timeBoxBig', 'relative font-mono')}>
            <div className="invisible">
                <p><span>00:00:00</span></p>
            </div>
            <div className="absolute inset-0">
                <p className="text-center">
                    <span>{time.hours}</span>
                    <span>:</span>
                    <span>{time.minutes}</span>
                    <span>:</span>
                    <span>{time.seconds}</span>
                </p>
            </div>
        </div>
    )
}

export default Clock;
