import { FaStar, FaExpand, FaHeart } from "react-icons/fa6"
import { Link, useLocation } from "react-router-dom"
import axios from 'axios';
import { useContext } from "react";
import { Context } from "../ContextProvider/ContenxtProvider";

export default function SlickCarusel({ element, slideWidth }) {
    const { cart, ShowModalProduct, openModalWishlist, wishlist } = useContext(Context);
    const location = useLocation();
    
    const addToCart = async (ev) => {
        ev.preventDefault();
        window.scrollTo({ top: '0', behavior: 'smooth' });
        const responseve = await axios.post("/api/auth/addToCart", { element });
        if (responseve.data) {
            window.location.reload();
        }
    }
    const FindId = () => {
        return cart.find((el) => el._id === element._id) ? <Link state={{ data: location.pathname.split("/")[1] }} className="add-cart gotocart" to={'/cart'}>
            <button>Got To Cart</button>
        </Link>
            : <Link onClick={addToCart} className="add-cart" to={'#'}>
                <button>Add to cart</button>
            </Link>
    }
    const checkColor = wishlist.find((item) => item._id === element._id) ? 'red' : '#d9d9e9'
    return (
        <div ref={slideWidth} className="item">
            <div className="product-badges">
                {element.discount !== "" ? <span className="badge discount">{element.discount} %</span> : ""}
                <span className="badge badge-text">recommended</span>
            </div>
            <div className="product-btns">
                <button onClick={() => ShowModalProduct(element)} className="btns"><FaExpand /></button>
                <button style={{color: `${checkColor}`}} onClick={() => openModalWishlist(element)} className="btns"><FaHeart /></button>
            </div>
            <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${element._id}`}>
                <div className="image">
                    <img src={element.src} alt="" />
                </div>
            </Link>
            <div className="carusel-content">
                <Link to={`/productdetalis/${element._id}`} state={{ data: location.pathname.split("/")[1] }}><h3>{element.text}</h3></Link>
                <div className="product-available in-stock">In Stock</div>
                <div className="starts flex mt-3">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <div className="price mt-3">
                    <del>${element.del}</del>
                    <ins>${element.price}</ins>
                </div>
                <div className="product-cart">
                    {FindId()}
                </div>
            </div>
        </div>
    )
}