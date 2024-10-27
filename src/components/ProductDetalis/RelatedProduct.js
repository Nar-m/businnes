
import { useContext } from "react"
import { Context } from "../ContextProvider/ContenxtProvider";
import { FaStar, FaExpand, FaHeart } from "react-icons/fa6"
import { Link, useLocation } from "react-router-dom"
import axios from 'axios';

export default function RelatedProduct({ viewProduct }) {
    const { cart, ShowModalProduct, openModalWishlist, wishlist, product } = useContext(Context);
    const location = useLocation();

    const addToCart = async (ev, element) => {
        ev.preventDefault();
        window.scrollTo({ top: '0', behavior: 'smooth' });
        const responseve = await axios.post("/api/auth/addToCart", { element });
        if (responseve.data) {
            window.location.reload();
        }
    }

    const FindId = (item) => {
        return cart.find((el) => el._id === item._id) ? <Link state={{ data: location.pathname.split("/")[1] }} className="add-cart gotocart" to={'/cart'}>
            <button>Got To Cart</button>
        </Link>
            : <Link onClick={(ev) => addToCart(ev, item)} className="add-cart" to={'#'}>
                <button>Add to cart</button>
            </Link>
    }

    const renderBrand = () => {
        return product.filter((el) => el.brand === viewProduct.brand && el._id !== viewProduct._id)
            .map((item, index) => {
                return (
                    <div key={index} className="related relative">
                        <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${item._id}`}>
                            <div className="image">
                                <img src={item.src} alt="" />
                            </div>
                        </Link>
                        <div className="product-badges">
                            {item.discount !== "" ? <span className="badge discount">{item.discount} %</span> : ""}
                            <span className="badge badge-text">recommended</span>
                        </div>
                        <div className="product-btns">
                            <button onClick={() => ShowModalProduct(item)} className="btns"><FaExpand /></button>
                            <button style={{ color: `${wishlist.find((el) => el._id === item._id) ? 'red' : '#d9d9e9'}` }}
                                onClick={() => openModalWishlist(item)} className="btns"><FaHeart /></button>
                        </div>
                        <div className="carusel-content">
                            <Link to={`/productdetalis/${item._id}`} state={{ data: location.pathname.split("/")[1] }}><h3>{item.text}</h3></Link>
                            <div className="product-available in-stock">In Stock</div>
                            <div className="starts flex mt-3">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className="price mt-3">
                                <del>${item.del}</del>
                                <ins>${item.price}</ins>
                            </div>
                            <div className="product-cart">
                                {FindId(item)}
                            </div>
                        </div>
                    </div>
                )
            })
    }


    return (
        <div className="related-product">
            <div className="related-title">
                <h1>Related products</h1>
            </div>
            <div className="flex flex-wrap items-center mt-2">
                {renderBrand()}
            </div>
        </div>
    )
}