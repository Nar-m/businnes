import { useEffect, useState } from "react"
import { CalculateDateProduct } from "./Calculate"

export default function CountDown() {
    const [timerProduct, setTimer] = useState(CalculateDateProduct());

    useEffect(() => {
        const intervalDate = setInterval(() => {
            setTimer(CalculateDateProduct());
        }, 1000)
        return () => clearInterval(intervalDate);
    }, [])

    const { timer } = timerProduct;

    return (
        <div className="countDown">
            <div className="count-item days">{timer.days}</div>
            <span>:</span>
            <div className="count-item hours">{timer.hours}</div>
            <span>:</span>
            <div className="count-item minutes">{timer.minutes}</div>
            <span>:</span>
            <div className="count-item secundes">{timer.seconds}</div>
        </div>
    )
}