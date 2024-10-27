import { useState, useEffect } from "react";
import { CalculateTimeLeft } from "./calculateTimeLeft";
import EndDate from "./offerenddate";
import './coundown.css';

export default function DayHoursProduct() {
    const offerStartDate = new Date();
    const totalOfferTime = new Date(EndDate()) - offerStartDate;

    const calculateProgress = (timeLeft) => {
        return (timeLeft / totalOfferTime) * 100;
    };

    const [timeLeftData, setTimeLeftData] = useState(CalculateTimeLeft()); //{}///
    const [progress, setProgress] = useState(calculateProgress(timeLeftData.difference));
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeftData(CalculateTimeLeft());
            const { difference } = CalculateTimeLeft()
            setProgress(calculateProgress(difference));
        }, 100);

        return () => clearInterval(timer);
    });
    const { timeLeft } = timeLeftData;

    return (
        <>
            <div className='progress'>
                <div style={{ width: `${progress}%` }} className='day-progress'></div>
            </div>
            <div className='flex items-center mt-3'>
                <div className="days-hours-minut-secundes flex items-center">
                    <div className="days">{timeLeft.days}</div>:
                    <div className="hours">{timeLeft.hours}</div>:
                    <div className="minutes">{timeLeft.minutes}</div>:
                    <div className="secundes">{timeLeft.seconds}</div>
                </div>
                <div className="expired-text ml-3">
                    Remains until the end<br></br> of the offer
                </div>
            </div>
        </>
    );
};
