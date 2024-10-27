import { useParams, useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import axios from 'axios';
import './productdetalis.css';
import ProductSingle from "./ProductSingle";
import ModalSlider from "../ModalSlider/ModalSlider";
import RelatedProduct from "./RelatedProduct";

export default function ProductDetalis() {
    const params = useParams();
    const [prevlocation, setprevlocation] = useState("");
    const [viewProduct, setviewProduct] = useState({});
    const [length, setlength] = useState(0);
    const [slideindex, setSliderIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation();
    const modal = useRef();
    const { id } = params;
    
    const openSldierIndex = (index) => {
        setOpenModal(true);
        setSliderIndex(index)
    }
    const clideModalClose = () => {
        setSliderIndex(0);
        setOpenModal(false);
    };
    const NextSlider = () => {
        setSliderIndex((slideindex) => slideindex === viewProduct.cat.length - 1 ? 0 : slideindex + 1);
    }
    const prevSlider = () => {
        setSliderIndex((slideindex) => slideindex === 0 ? viewProduct.cat.length - 1 : slideindex - 1);
    }
    useEffect(() => {
        axios.get(`/api/auth/getViewProduct/${id}`)
            .then((resp) => {
                if (resp.data) {
                    setviewProduct(resp.data)
                    setlength(resp.data.cat.length)
                    return;
                }
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`/api/auth/getClothesDetalis/${id}`)
            .then((resp) => {
                if (resp.data) {
                    setviewProduct(resp.data)
                    setlength(resp.data.cat.length)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        if (!location.state) return;
        setprevlocation(location.state.data)
    }, [])

    return (
        <div className="detalis-conteiner">
            <div className="single-conteiner">
                <div className="flex items-center justify-between">
                    <div className="flex items-center product-location">
                        <span className="location">{prevlocation === "" || prevlocation === 'cart' ? "Home" : prevlocation}</span>
                        <span><HiOutlineChevronRight /></span>
                        <span className="location brand">{viewProduct.brand}</span>
                        {viewProduct.category ? <><span><HiOutlineChevronRight /></span>
                            <span className="location gender">{viewProduct?.category}</span></> : ""}
                        {viewProduct.gender ? <><span><HiOutlineChevronRight /></span>
                            <span className="location gender">{viewProduct?.gender}</span></> :
                            ""}
                    </div>
                </div>
                <ProductSingle openSldierIndex={openSldierIndex} viewProduct={viewProduct} />
                <RelatedProduct viewProduct={viewProduct} />
            </div>
            <ModalSlider
                clideModalClose={clideModalClose}
                prevSlider={prevSlider}
                NextSlider={NextSlider}
                modal={modal}
                openModal={openModal}
                slideindex={slideindex}
                length={length}
                viewProduct={viewProduct} />
        </div>
    )
}