import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ClothesCarusel() {
    const [carusel, setCarusel] = useState([]);
    const [length, setLength] = useState(0)
    const [sliderIndex, setSliderIndex] = useState(0);
    const [dottIndex, setDottindex] = useState(0);
    const [dragging, setDrgaging] = useState(false)
    const ref = useRef();
    const startX = useRef(0);
    const currentX = useRef(0);
    const owlCarusel = useRef();
    const pagination = [];

    for (let i = 1; i <= Math.ceil((length / 3)); i++) {
        pagination.push(i);
    }

    const HandleDragging = (event) => {
        event.preventDefault();
        setDrgaging(true);
        startX.current = event.clientX;
        currentX.current = sliderIndex;
        owlCarusel.current.style.transition = 'none';
    }

    const HandleDragMove = (event) => {
        event.preventDefault();
        if (!dragging) return;
        const deltaX = event.clientX - startX.current;
        const newposition = currentX.current - deltaX;
        setSliderIndex(newposition);
    }

    const HandleDragEnd = () => {
        setDrgaging(false);
        const width = ref.current.clientWidth * 3;
        const newIndex = Math.round(sliderIndex / width);

        if (newIndex >= length / 3) {
            setSliderIndex((newIndex - 1) * width);
        }
        else if (newIndex <= -1) {
            setSliderIndex(0);
            setDottindex(0);
        }
        else {
            setSliderIndex(newIndex * width);
            setDottindex(newIndex);
        }
        owlCarusel.current.style.transition = ' all 0.8s ease-in-out';
    }

    const NextCaruselShow = () => {
        setDottindex(dottIndex + 1);
        const width = ref.current.clientWidth * 3;
        setSliderIndex(sliderIndex + 1 * width);
        owlCarusel.current.style.transition = ' all 0.8s ease-in-out';
    }
    const PrevCaruselShow = () => {
        setDottindex(dottIndex - 1)
        const width = ref.current.clientWidth * 3;
        setSliderIndex(sliderIndex - 1 * width);
        owlCarusel.current.style.transition = ' all 0.8s ease-in-out';
    }
    const showCaruselItem = (index) => {
        setDottindex(index);
        const width = ref.current.clientWidth * 3;
        const showPicture = (index * width);
        setSliderIndex(showPicture);
        owlCarusel.current.style.transition = ' all 0.8s ease-in-out';
    }
    useEffect(() => {
        axios.get("/api/auth/getSliders")
            .then((responseve) => {
                setCarusel(responseve.data);
                setLength(responseve.data.data.length);
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="mt-5 flex justify-center items-center flex-col text-center">
            <h2 className="our-services">Our Services</h2>
            <p className="text-services">Here are some images of uniforms</p>
            <div className="flex items-center">
                <button onClick={PrevCaruselShow} style={{ color: '#ed174a', transform: `scale(${dottIndex <= 0 ? '0' : '1'})` }}>
                    <FaChevronLeft size={40} />
                </button>
                <div
                    onMouseDown={HandleDragging}
                    onMouseMove={HandleDragMove}
                    onMouseLeave={HandleDragEnd}
                    onMouseUp={HandleDragEnd}
                    className="carusel-servies mt-3">
                    <div ref={owlCarusel} style={{
                        transform: `translateX(-${sliderIndex}px)`,
                    }} className="owl-carusel-boxes">
                        {carusel.data?.map((item, index) => {
                            return (
                                <div ref={ref} key={index} className="owl-carusel-items">
                                    <div className="image">
                                        <img style={{ borderRadius: '7px' }} src={item.src} alt="" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button onClick={NextCaruselShow} style={{ color: '#ed174a', transform: `scale(${dottIndex === length / 3 - 1 ? '0' : '1'})` }}><FaChevronRight size={40} /></button>
            </div>
            <div className="flex mt-2 justify-center items-center">
                {pagination.map((element, index) => <div onClick={() => showCaruselItem(index)} style={{
                    background: `${dottIndex === index ? '#ed174a' : '#9b9bb4'}`
                }} key={index} className="doott"></div>)}
            </div>
        </div>
    )
}