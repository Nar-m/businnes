
import { FaXmark } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import axios from "axios";
import { useContext } from "react";
import { Context } from "../ContextProvider/ContenxtProvider";

export default function WishlistContent({ item }) {
    const { cart } = useContext(Context);

    const location = useLocation();
    const removeWishlistitem = async () => {
        const resp = await axios.delete(`/api/auth/deleteWishlist/${item._id}`)
        if (resp.data) {
            window.location.reload()
        }
    }
    const addToCart = async () => {

        const resp = await axios.post("/api/auth/addToCart", { element: item })
        if (resp.data) {
            window.location.reload();
        }
    }
    return (
        <tr>
            <td className="wishlist-cb">
                <input type='checkbox' />
            </td>
            <td className='wishlist-remove'>
                <span onClick={removeWishlistitem} className="delete-wishlist"><FaXmark /></span>
            </td>
            <td className='wishlist-picture'>
                <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${item._id}`}>
                    <div className="image">
                        <img src={item.src} alt="" />
                    </div>
                </Link>
            </td>
            <td className='wishlist-name'>
                <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${item._id}`}><span>{item.text}</span></Link>
            </td>
            <td className='wishlist-price'>
                <span> <span>{item.del} $</span> <span>{item.price} $</span></span>
            </td>
            <td className='wishlist-status'>
                <span>In Stock</span>
            </td>
            {cart.find((el) => el._id === item._id) ? <td className="wishlist-btns">
                <button>Add to Cart</button>
            </td> : <td className="wishlist-btns">
                <button onClick={addToCart}>Add to Cart</button>
            </td>}
        </tr>
    )
}