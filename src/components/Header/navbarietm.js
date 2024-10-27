import { IoFastFood } from "react-icons/io5";
import { FaCloudsmith } from 'react-icons/fa6';

export const navbaraItem = [
    {
        item: "Home",
        active: "Home",
        link: "/"
    },
    {
        item: "MEAST & SEAFOOD ",
        active: "Food",
        link: "/food",
        icon: <IoFastFood />
    },
    {
        item: "CLOTHES",
        active: "Clothes",
        link: "/clothes",
        icon: <FaCloudsmith />
    },
]