import { FaArrowRight, FaArrowLeft } from "react-icons/fa6"


export default function ModalContent(props) {
    const {viewProduct, slideindex, NextSlider, prevSlider, scaleZoomImg, scaleSlider} = props;
    return (
        <div className="modal-cotent">
            <div className="slid-item">
                <div onClick={prevSlider} className="slid-btns prev">
                    <FaArrowLeft />
                </div>
                <div style={{transform: `scale(${scaleSlider ? '1.6' : '1'})`}} onClick={scaleZoomImg} className="modal-img">
                    {viewProduct.cat ? <div className="image">
                        <img src={viewProduct.cat[slideindex].path} alt="" />
                    </div> : ''}
                </div>
                <div onClick={NextSlider} className="slid-btns right">
                    <FaArrowRight />
                </div>
            </div>
        </div>
    )
}