import axios from "axios"
import { useContext } from "react"
import { FaExpand, FaHeart } from "react-icons/fa6";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../ContextProvider/ContenxtProvider";
import { FaStar } from "react-icons/fa6";
import Multy from "../multy/Multy";
import Pagination from "./Pagination";

export default function ClothesContent(props) {
    const { productShop, filters, setFilters, totalPages, handlePageChange, curentPages, nextPages, prevPages } = props;
    const { cart, openModalWishlist, wishlist, ShowModalProduct } = useContext(Context);
    const location = useLocation();

    const addToCart = async (ev, element) => {
        ev.preventDefault();
        const responseve = await axios.post("/api/auth/addToCart", { element });
        if (responseve.data) {
            window.scrollTo({ top: '0', behavior: 'smooth' });
            window.location.reload();
        }
    }
    const FindId = (element) => {
        return cart.find((el) => el._id === element._id)
            ? <Link state={{ data: location.pathname.split("/")[1] }} className="add-cart gotocart" to={'/cart'}>
                <button>Got To Cart</button>
            </Link>
            : <Link onClick={(ev) => addToCart(ev, element)} className="add-cart" to={'#'}>
                <button>Add to cart</button>
            </Link>
    }
    const checkColor = (element) => {
        return wishlist.find((item) => item._id === element._id) ? 'red' : '#d9d9e9'
    }
    return (
        <div className="flex flex-col pt-2">
            <Multy setFilters={setFilters} filters={filters} />
            {productShop.length === 0 ? <div style={{ fontSize: '18px' }} className="result-text text-center p-3">No results were found for your search.</div> :
                <div className="flex items-center flex-wrap">
                    {productShop?.map((element, index) => {
                        return (
                            <div style={{ width: '320px', borderRadius: '7px' }} key={index} className="item clothes-items active">
                                <div className="product-btns">
                                    <button onClick={() => ShowModalProduct(element)} className="btns"><FaExpand /></button>
                                    <button style={{ color: `${checkColor(element)}` }} onClick={() => openModalWishlist(element)} className="btns"><FaHeart /></button>
                                </div>
                                <Link to={`/productdetalis/${element._id}`} state={{ data: location.pathname.split("/")[1] }}>
                                    <div className="image">
                                        <img src={element.src} alt="" />
                                    </div>
                                </Link>
                                <div className="carusel-content">
                                    <Link to={`/productdetalis/${element._id}`} state={{ data: location.pathname.split("/")[1] }}>
                                        <h3>{element.text}</h3>
                                    </Link>
                                    <Link className="mt-2" to={`/productdetalis/${element._id}`} state={{ data: location.pathname.split("/")[1] }}>
                                        <p>{element.description}</p>
                                    </Link>
                                    <div className="product-available in-stock">In Stock</div>
                                    <div className="starts flex items-center mt-3">
                                        <span className="star-count mr-2">{element.star ? element.star : ""}</span>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </div>
                                    <div className="price mt-3">
                                        {element.del ? <del>${element?.del}</del> : ""}
                                        <ins>${element.price}</ins>
                                    </div>
                                    <div className="product-cart">
                                        {FindId(element)}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            <Pagination
                prevPages={prevPages}
                nextPages={nextPages}
                totalPages={totalPages}
                curentPages={curentPages}
                handlePageChange={handlePageChange} />
        </div>
    )
}