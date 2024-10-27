import { lastDate } from "./endDate";

export const CalculateDateProduct = () => {
    const curentDate = new Date();
    const difference = +new Date(lastDate) - +curentDate;
    let timer = {};

    if (difference > 0) {
        timer = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        }
    }
    return { difference, timer };
}

