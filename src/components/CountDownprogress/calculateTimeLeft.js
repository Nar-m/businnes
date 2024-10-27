import EndDate from "./offerenddate";

export const CalculateTimeLeft = () => {
    const currentTime = new Date();
    const difference = +new Date(EndDate()) - +currentTime;
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return { timeLeft, difference };
};

