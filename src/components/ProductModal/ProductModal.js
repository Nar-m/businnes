import { useContext, useState, useEffect } from "react";
import { Context } from "../ContextProvider/ContenxtProvider";
import './productModal.css';
import { FaXmark,  FaArrowDown, FaArrowUp, FaCheck, FaHeart } from 'react-icons/fa6';
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductModal() {
    const { openModal, openModalWishlist, closeModalProduct, cart, setQuantity, quantity, wishlist } = useContext(Context);
    const [curentIndex, setCurentIndex] = useState(0);

    const checkContent = wishlist.find((el) => el._id === openModal.element._id)
    ? <button className="check"><FaCheck /></button> : <button onClick={() => openModalWishlist(openModal.element)} className="add-to-wishlist">
        <FaHeart />
        <span className="ml-2">add to wishlist</span>
    </button>

    const checkCartButton = () => {
        return cart.find((el) => el._id === openModal.element._id) ?
            <div className="single-btns-cart">
                <Link to={'/cart'}>
                    <button className="go-to-cart">Go to Cart</button>
                </Link>
            </div> : <div className="single-btns-cart">
                <button onClick={addToCart} className="add-to-cart">Add to cart</button>
            </div>
    }

    const incrementQuantity = () => {
        setQuantity(quantity + 1)
        localStorage.setItem('quantity', quantity)
    }
    const decrementQuantity = () => {
        setQuantity(quantity - 1);
        localStorage.setItem('quantity', quantity)
    }

    const addToCart = async () => {
        const resp = await axios.post("/api/auth/addToCart", {
            element: openModal.element,
            quantity: quantity
        })
        if (resp.data) {
            window.location.reload()
            setQuantity(1);
            localStorage.setItem('quantity', quantity)
        }
    }

    const hide = (event) => {
        return event.target.className === 'modal-product-conteiner active' ? closeModalProduct() : null
    }
    useEffect(() => {
        localStorage.setItem('quantity', quantity)
    }, [quantity])
    return (
        <div onClick={hide} className={`${openModal.open ? 'modal-product-conteiner active' : 'modal-product-conteiner'}`}>
            <div className="modal-content">
                <button onClick={closeModalProduct} className="close"><FaXmark /></button>
                <div className="product-modal-header">
                    <h1>{openModal.element.text}</h1>
                    <div className="product-meta-top">
                        <div className="product-brands">
                            <span className="brands" style={{ color: 'gray' }}>Brands: </span> <span className="ml-2">{openModal.element.brand}</span>
                        </div>
                        <div className="product-rating"></div>
                    </div>
                </div>
                <div className="modal-product-wrapper active">
                    <div className="product-wrapper flex flex-col items-center">
                        <div className={`${openModal.open ? 'picture-wrapper active' : 'picture-wrapper'} relative`}>
                            <div className="product-badges">
                                {openModal.element.discount !== "" ? <span className="badge discount">{openModal.element.discount} %</span> : ""}
                                <span className="badge badge-text">recommended</span>
                            </div>
                            {openModal.element.cat?.map((item, index) => {
                                return (
                                    <div style={{
                                        left: `${index * 100}%`,
                                        transform: `translateX(-${curentIndex * 100}%)`
                                    }} key={index} className="sliders">
                                        <div className="image">
                                            <img src={item.path} alt="" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex items-center">
                            {openModal.element.cat?.map((item, index) => {
                                return (
                                    <div onClick={() => setCurentIndex(index)} key={index} className={`${curentIndex === index
                                        ? 'img-item active'
                                        : 'img-item'}`}>
                                        <img src={item.path} alt="" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="description-col">
                        <p className="price">
                            <del>{openModal.element.del} $</del>
                            <ins>{openModal.element.price} $</ins>
                        </p>
                        <div className="product-meta">
                            <div className="stock">
                                <span>In Stock</span>
                            </div>
                        </div>
                        <div className="product-descript">{openModal.element.description}</div>
                        <div className="single-controls">
                            <div className="single-quantity">
                                <button
                                    className={`${quantity === 1 ? 'quantity-btns disabled' : 'quantity-btns minus'}`}
                                    disabled={quantity === 1 ? true : false} onClick={decrementQuantity}>-</button>
                                <div className="quantity">{quantity}</div>
                                <button onClick={incrementQuantity} className="quantity-btns">+</button>
                            </div>
                            {checkCartButton()}
                        </div>
                        <div className="product-actions">
                            {checkContent}
                            <div className="compare">
                                <span className="flex">
                                    <FaArrowDown />
                                    <FaArrowUp />
                                </span>
                                Compare
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}