import './carusel.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { useEffect, useContext, useState, useRef } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import SlickCarusel from './SlickCarusel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export default function Carusel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [dragging, setDragging] = useState(false);
    const { product } = useContext(Context)
    const [transition, setTransition] = useState('none');
    const startX = useRef(0);
    const currentX = useRef(0);
    const slideWidth = useRef();
    const prevCarusel = () => {
        if (activeIndex <= 0) return;
        setActiveIndex(activeIndex - slideWidth.current.clientWidth - 10)
    }
    const NextCarusel = () => {
        setActiveIndex(activeIndex + slideWidth.current.clientWidth + 10)
    }
    const HandleStartDraging = (e) => {
        e.preventDefault();
        setDragging(true);
        startX.current = e.clientX;
        currentX.current = activeIndex;
        setTransition('none');
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
        if (newindex >= product.length - 4) {
            setActiveIndex(product.length - 4)
            setTransition('all 1s cubic-bezier(0.28, 0.12, 0.22, 1)');
        }
        else {
            setActiveIndex(newindex * width);
            setTransition('all 1s cubic-bezier(0.28, 0.12, 0.22, 1)');
        }
    }

    useEffect(() => {
        if (!slideWidth.current) return;
    }, [])

    return (
        <div className="pt-5">
            <div className="carusel-header flex justify-between items-center">
                <div className="carusel-title">
                    <h4>Best Selers</h4>
                    <div className='entry-description'>Do not miss the current offers until the end of March.</div>
                </div>
                <div className="view-all">
                    <Link to={'/food'}>View All <FaArrowRight /></Link>
                </div>
            </div>
            <div className='carusel'
                onMouseMove={HandleDragMove}
                onMouseUp={HandleDragEnd}
                onMouseLeave={HandleDragEnd}
                onMouseDown={HandleStartDraging}>
                <button onClick={prevCarusel} className='carusel-icon left'>
                    <FaChevronLeft />
                </button>
                <div className='carusel-conteiner'>
                    <div className='owl-carusel' style={
                        { transition: `${transition}`, transform: `translateX(-${activeIndex}px)` }
                    }>
                        {product?.slice(0, 8).map((element, index) => {
                            return (
                                <SlickCarusel slideWidth={slideWidth} key={index} element={element} />
                            )
                        })}
                    </div>
                </div>
                <button onClick={NextCarusel} className='carusel-icon right'>
                    <FaChevronRight />
                </button>
            </div>
        </div>
    )
}