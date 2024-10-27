import { pictureSliders } from "./slider"
import { useState, useEffect } from "react"
import { useContext } from "react";
import { Context } from "../ContextProvider/ContenxtProvider";

export default function ClothesSliders({ setSliderProgress }) {
    const [activeIndex, setActiveindex] = useState(0);
    const [intervalSldier, setIntervalidSlider] = useState(true);
    const { productRef } = useContext(Context);

    const nextSldier = () => {
        setActiveindex((activeIndex) => activeIndex === pictureSliders.length - 1
            ? 0 : activeIndex + 1)
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (intervalSldier) {
                setSliderProgress((sliderProgress) => {
                    if (sliderProgress >= 100) {
                        nextSldier();
                        return 0;
                    }
                    else {
                        return sliderProgress + 1;
                    }
                })
            }
        }, 50);
        return () => clearInterval(interval);
    }, [intervalSldier])

    return (
        <div className="clothes-sliders">
            {pictureSliders?.map((slid, index) => {
                return (
                    <div style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })}
                        onMouseLeave={() => setIntervalidSlider(true)}
                        onMouseMove={() => setIntervalidSlider(false)}
                        className={`${activeIndex === index ? 'slid-item active' : 'slid-item'}`}>
                        <div className="image" key={index}>
                            {activeIndex === index && (<img src={slid.img} alt="" />)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}