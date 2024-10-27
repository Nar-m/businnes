import './sliders.css';
import { Slide } from './slid';
import SldierDots from './sliderDots';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';


export default function Sliders() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [dottIndex, setDottindex] = useState(0);
    const [transition, setTransition] = useState('none');
    const startX = useRef(0);
    const currentX = useRef(0);
    const slideWidth = useRef();

    const HandleStartDraging = (e) => {
        e.preventDefault();
        setDragging(true);
        startX.current = e.clientX;
        currentX.current = activeIndex;
        setTransition('none');
    }
    const clickIndex = (index) => {
        setDottindex(index);
        const width = slideWidth.current.clientWidth;
        const newindex = index * width;
        setActiveIndex(newindex);
        setTransition('all 1s cubic-bezier(0.28, 0.12, 0.22, 1)');
    }
    const HandleDragMove = (e) => {
        e.preventDefault();
        if (!dragging) return;
        const deltaX = e.clientX - startX.current;
        const newPosition = currentX.current - deltaX;
        setActiveIndex(newPosition);
    }
    const HandleDragEnd = () => {
        setDragging(false);
        const width = slideWidth.current.clientWidth;
        const newindex = Math.round(activeIndex / width);
        if (newindex > Slide.length - 1) {
            setActiveIndex((newindex - 1) * width);
            setDottindex(Slide.length - 1)
            setTransition('all 1s cubic-bezier(0.28, 0.12, 0.22, 1)');
        }
        else if(newindex <= -1) {
            setActiveIndex(0);
            setDottindex(0);
        }
        else {
            setActiveIndex(newindex * width);
            setDottindex(newindex);
            setTransition('all 1s cubic-bezier(0.28, 0.12, 0.22, 1)');
        }
    }

    return (
        <div
            onMouseMove={HandleDragMove}
            onMouseDown={HandleStartDraging}
            onMouseUp={HandleDragEnd}
            onMouseLeave={HandleDragEnd}
            className="slider-conteiner">
            <div
                style={{ transition: `${transition}`, transform: `translateX(-${activeIndex}px)` }} className="slider-item">
                {Slide?.map((item, index) => {
                    return (
                        <Link onClick={() => {
                            window.scrollTo({ top: '0', behavior: 'smooth' })
                        }} to={`/food`} key={index}>
                            <div ref={slideWidth} className='slide'>
                                <div className='image'>
                                    <img src={item.img} alt='' />
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <SldierDots
                dottIndex={dottIndex}
                clickIndex={clickIndex}
            />
        </div>
    )
}