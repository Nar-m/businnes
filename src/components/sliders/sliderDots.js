import { Slide } from "./slid"

export default function SldierDots({ dottIndex, clickIndex }) {
    return (
        <ul className="doot-slider">
            {Array.from({ length: Slide.length }).map((__, index) => <li
                onClick={() => clickIndex(index)} key={index} className={`${dottIndex === index ? 'doot-item active' : 'doot-item'}`}>
            </li>)}
        </ul>
    )
}