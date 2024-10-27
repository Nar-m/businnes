import { useContext, useEffect, useState } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"

export default function CartProgress() {
    const { cart } = useContext(Context);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const cartProgress = cart.reduce((aggr, val) => {
            return aggr += parseInt(val.price) * val.quantity
        }, 0)
        setProgress(cartProgress)
    }, [cart])

    return (
        <div className="cart-progress">
            <div className="progress-title">
                Your order qualifies for free shipping!
            </div>
            <div className="progress">
                <div style={{width: `${progress}%`}} className="result-progress"></div>
            </div>
        </div>
    )
}