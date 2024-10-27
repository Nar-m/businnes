import { useContext } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"
import { Link, useLocation } from "react-router-dom"
import { FaStar, FaExpand, FaHeart } from "react-icons/fa6"
import axios from "axios"
import Multy from "../multy/Multy"

export default function FoodContent(props) {
    const { grid, filters, setFilters, pages, showMore } = props
    const { openModalWishlist, cart, ShowModalProduct, wishlist } = useContext(Context)
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
        return cart.find((el) => el._id === item._id) ?
            <Link state={{ data: location.pathname.split("/")[1] }} className="add-cart gotocart" to={'/cart'}>
                <button>Got To Cart</button>
            </Link>
            : <Link onClick={(ev) => addToCart(ev, item)} className="add-cart" to={'#'}>
                <button>Add to cart</button>
            </Link>
    }
    return (
        <div className="flex flex-col">
            <Multy setFilters={setFilters} filters={filters}/>
            <div className="flex mt-3 flex-wrap items-center">
                {filters.slice(0, pages * 6).map((element, index) => {
                    return (
                        <div style={{ width: `${grid}%` }} key={index} className="food-item active related relative">
                            <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${element._id}`}>
                                <div className="image">
                                    <img src={element.src} alt="" />
                                </div>
                            </Link>
                            <div className="product-badges">
                                {element.discount !== "" ? <span className="badge discount">{element.discount} %</span> : ""}
                                <span className="badge badge-text">recommended</span>
                            </div>
                            <div className="product-btns">
                                <button onClick={() => ShowModalProduct(element)} className="btns"><FaExpand /></button>
                                <button style={{ color: `${wishlist.find((el) => el._id === element._id) ? 'red' : '#d9d9e9'}` }}
                                    onClick={() => openModalWishlist(element)} className="btns"><FaHeart /></button>
                            </div>
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
                                    {FindId(element)}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-center items-center mt-2"><button onClick={showMore} className="show-more w-50">Show More</button></div>
        </div>
    )
}