
import { HiOutlineChevronRight } from "react-icons/hi";
import './bredcrumps.css'

export default function BreadCrumb({prevlocation, title}) {
    return (
        <div className="breadcrumps flex items-center">
            <span className="location">{prevlocation === "" || prevlocation === 'cart' || prevlocation === 'food' ? "Home" : prevlocation}</span>
            <span className="arrow" style={{marginLeft: '6px'}}><HiOutlineChevronRight/></span>
            <span className="title" style={{marginLeft: '6px'}}>{title}</span>
        </div>
    )
}