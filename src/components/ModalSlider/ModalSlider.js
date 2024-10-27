import './modalslider.css';
import { FaMagnifyingGlassPlus, FaXmark } from 'react-icons/fa6';
import ModalContent from './ModalContent';
import { useState } from 'react';

export default function ModalSlider(props) {
    const { NextSlider,
        clideModalClose,
        prevSlider,
        viewProduct,
        openModal,
        modal,
        slideindex,
        length } = props
    const [scaleSlider, setScaleSldiers] = useState(false);

    const scaleZoomImg = () => {
        setScaleSldiers(!scaleSlider)
    }
    function close() {
        clideModalClose()
        setScaleSldiers(false)
        const fullscreen = document.fullscreenElement;
        if (fullscreen) {
            document.exitFullscreen();
        }
    }
    const FullScreen = () => {
        const fullscreen = document.fullscreenElement;
        if (fullscreen) {
            document.exitFullscreen();
        }
        else {
            modal.current.requestFullscreen()
        }
    }
    return (
        <div ref={modal} className={`${openModal ? 'modal-slider-conteiner active' : 'modal-slider-conteiner'}`}>
            <div className='flex w-full justify-between items-center modal-slider-header'>
                <div>{slideindex + 1} / {length}</div>
                <div className='flex z-100  items-center'>
                    <button onClick={scaleZoomImg}>
                        <FaMagnifyingGlassPlus />
                    </button>
                    <button onClick={FullScreen}>
                        <i className="fa-solid fa-expand"></i>
                    </button>
                    <button onClick={close}>
                        <FaXmark />
                    </button>
                </div>
            </div>
            <ModalContent
                scaleSlider={scaleSlider}
                scaleZoomImg={scaleZoomImg}
                viewProduct={viewProduct}
                prevSlider={prevSlider}
                NextSlider={NextSlider}
                slideindex={slideindex} />
        </div>
    )
}