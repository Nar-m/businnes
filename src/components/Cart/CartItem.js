import { useLocation, Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6"
import axios from "axios"

export default function CartItem({ item }) {
    const location = useLocation();


    const deletCartitem = async () => {
        const resp = await axios.delete(`/api/auth/deletCartitem/${item._id}`)
        if (resp.data) {
            window.location.reload()
            window.scrollTo({ top: '200', behavior: "smooth" })
        }
    }
    const incrementquanity = async () => {
        const resp = await axios.get(`/api/auth/increment/${item._id}`);
        if (resp.data) {
            window.location.reload()
        }
    }
    const decrementquanity = async () => {
        const resp = await axios.get(`/api/auth/decrement/${item._id}`);
        window.location.reload()
    }
    return (
        <tr>
            <td className="cart-item-img">
                <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${item._id}`}>
                    <div style={{ width: '70px', height: '70px' }} className="image">
                        <img src={item.src} alt="" />
                    </div>
                </Link>
            </td>
            <td className="cart-item-name">
                <Link to={`/productdetalis/${item._id}`}> <span>{item.text}</span></Link>
            </td>
            <td className="cart-item-priec">
                <span className="cart-price">$ {item.price}</span>
            </td>
            <td className="product-quanity">
                <div className="cart-quanity">
                    <div><button
                        onClick={decrementquanity}
                        className={`${item.quantity === 1 ? 'quantity-btns mr-3 disabled' : 'quantity-btns mr-3'}`}
                        disabled={item.quantity === 1 ? true : false}>-</button></div>
                    <div className="quantity-number">{item.quantity}</div>
                    <div>
                        <button onClick={incrementquanity} className="quantity-btns ml-3">+</button>
                    </div>
                </div>
            </td>
            <td className="product-subtotal">
                <span className="subtotal"> $ {(item.price * item.quantity).toFixed(2)}</span>
            </td>
            <td className="product-remove">
                <span onClick={deletCartitem} className="remove"><FaXmark /></span>
            </td>
        </tr>
    )
}