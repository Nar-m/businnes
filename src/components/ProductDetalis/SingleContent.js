import SingleDottImg from "./SingleDottImg"
import { useEffect, useState, useContext } from "react"
import {
    FaAutoprefixer,
    FaCheck,
    FaHeart,
    FaGuaraniSign,
    FaArrowUp,
    FaArrowDown,
    FaDollarSign
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon
} from 'react-share';

import axios from 'axios';
import { Context } from "../ContextProvider/ContenxtProvider";

export default function SingelContent({ viewProduct, openSldierIndex }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const { openModalWishlist, wishlist, cart, setQuantity, quantity } = useContext(Context);

    const shareUrl = `http://localhost:5000/api/auth/share/${viewProduct._id}`;

    const checkContent = wishlist.find((el) => el._id === viewProduct._id)
        ? <Link to={'/wishlist'}><button className="check"><FaCheck /></button></Link>
        : <button onClick={() => openModalWishlist(viewProduct)} className="add-to-wishlist">
            <FaHeart />
            <span className="ml-2">add to wishlist</span>
        </button>

    const incrementQuantity = () => {
        setQuantity(quantity + 1)
    }
    const decrementQuantity = () => {
        setQuantity(quantity - 1);
    }
    const addToCart = async () => {
        const resp = await axios.post("/api/auth/addToCart", {
            element: viewProduct,
            quantity: quantity
        })
        if (resp.data) {
            window.location.reload()
            setQuantity(1);
        }
    }

    const checkCartButton = () => {
        return cart.find((el) => el._id === viewProduct._id) ?
            <div className="single-btns-cart">
                <Link to={'/cart'}>
                    <button className="go-to-cart">Go to Cart</button>
                </Link>
            </div> : <div className="single-btns-cart">
                <button onClick={addToCart} className="add-to-cart">Add to cart</button>
            </div>
    }

    return (
        <div className="single-content mt-2">
            <div className="flex w-full justify-between">
                <div className="flex">
                    <div className="col flex flex-col">
                        <div className="col-wrapper">
                            <div className="slider-wrapper active">
                                <div className="viewport">
                                    <div className="product-badges">
                                        {viewProduct.discount !== "" || viewProduct.discount === undefined ? <span className="badge discount">{viewProduct.discount} %</span> : ""}
                                        <span className="badge badge-text">recommended</span>
                                    </div>
                                    {viewProduct.cat?.map((el, ind) => {
                                        return (
                                            <div style={{
                                                left: `${ind * 100}%`,
                                                transform: `translateX(-${activeIndex * 100}%)`
                                            }} className="slide" key={ind}>
                                                <div onClick={() => openSldierIndex(ind)} className="image">
                                                    <img src={el.path} alt="" />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div style={{ marginLeft: '7rem' }} className="flex items-center mt-2">
                                    {viewProduct.cat?.map((item, index) => {
                                        return (
                                            <SingleDottImg
                                                onclick={() => setActiveIndex(index)}
                                                checkClass={activeIndex === index} key={index} item={item} />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description-col">
                        <p className="price">
                            {viewProduct.del ? <del>{viewProduct?.del} $</del> : ""}
                            <ins>{viewProduct.price} $</ins>
                        </p>
                        <div className="product-meta">
                            <div className="stock">
                                <span>In Stock</span>
                            </div>
                        </div>
                        <div className="product-descript">{viewProduct.description}</div>
                        <div className="single-controls">
                            <div className="single-quantity">
                                <button
                                    className={`${quantity <= 1 ? 'quantity-btns disabled' : 'quantity-btns minus'}`}
                                    disabled={quantity <= 1 ? true : false} onClick={decrementQuantity}>-</button>
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
                        <ul className="social-continer flex items-center mt-3">
                            <li>
                                <FacebookShareButton url={shareUrl} quote={viewProduct.title}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                            </li>
                            <li>
                                <WhatsappShareButton url={shareUrl} quote={viewProduct.title}>
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </li>
                            <li>
                                <TwitterShareButton url={shareUrl} title={viewProduct.title}>
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                            </li>
                        </ul>
                        {viewProduct.color && viewProduct.category && viewProduct.country ?
                            <>  <div className="product-color mt-3">
                                <span>color: {viewProduct?.color}</span>
                            </div>
                                <div className="product-category mt-3">
                                    <span>category: {viewProduct?.category}</span>
                                </div>
                                <div className="product-country mt-3">
                                    <span>country: {viewProduct?.country}</span>
                                </div></> : null}
                    </div>
                </div>
                <div className="covid-19-info">
                    <div className="alert-message">Covid-19 Info: We keep delivering.</div>
                    <div className="icon-messages">
                        <ul>
                            <li>
                                <div className="icons"><FaAutoprefixer /></div>
                                <div className="message">Free Shipping apply to all orders over $100</div>
                            </li>
                            <li>
                                <div className="icons"><FaGuaraniSign /></div>
                                <div className="message">Guranteed 100% Organic from natural farmas</div>
                            </li>
                            <li>
                                <div className="icons"><FaDollarSign /></div>
                                <div className="message">1 Day Returns if you change your mind</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}