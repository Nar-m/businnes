import { useContext } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"
import { Link, useLocation } from "react-router-dom";

export default function CartTotals() {
    const { cart } = useContext(Context);
    const location = useLocation();

    const calculateSubTotal = (price, quantity) => {
        return price * quantity
    }

    const calculateTotal = () => {
        return cart.reduce((aggr, val) => {
            return aggr + calculateSubTotal(val.price, val.quantity)
        }, 0)
    }

    return (
        <div className="cart-totals mt-4 ml-10">
            <div>
                <h2 className="cart-totlas-title">Cart totals</h2>
                <table>
                    <tbody>
                        <tr className="cart-subtotal">
                            <th>Subtotal</th>
                            <td>
                                <span>$ {calculateTotal().toFixed(2)}</span>
                            </td>
                        </tr>
                        <tr className="cart-shipping">
                            <th>Shipping</th>
                            <td>
                                <ul className="shiping-metods">
                                    <li>
                                        <input className="radio" id="radio" type="radio" />
                                        <label htmlFor="radio">
                                            Flat rate: <span>$5.00</span>
                                        </label>
                                    </li>
                                    <li>
                                        <input className="radio" id="radio" type="radio" />
                                        <label htmlFor="radio">
                                            Local pickup
                                        </label>
                                    </li>
                                </ul>
                                <p style={{
                                    fontWeight: "400",
                                    letterSpacing: '0',
                                    lineHeight: '24px',
                                    color: '#212529',
                                    fontSize: '.775rem',
                                    fontFamily: "Inter, sans-serif",
                                }} className="shiping-description">Shipping to</p>
                                <Link style={{
                                    fontSize: '.825rem',
                                    marginTop: '20px',
                                    color: '#2bbef9'
                                }} className="change-address" to={'#'}>Change address</Link>
                            </td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td style={{ paddingTop: '26px' }}>
                                <span>$ {calculateTotal().toFixed(2)}</span>
                            </td>
                        </tr>
                    </tbody>
                    <div className="proceed-checkout">
                        <Link state={{ data: location.pathname.split("/")[0] }} to={'/checkout'}> <button>Proceed to checkout</button></Link>
                    </div>
                </table>
            </div>
        </div>
    )
}