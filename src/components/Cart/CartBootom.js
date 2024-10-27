import axios from "axios"
import { useContext } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"

export default function CartBootom() {
    const {setQuantity} = useContext(Context);

    const clearCart = () => {
        setQuantity(1);
        localStorage.setItem('quantity', 1)
        axios.delete('/api/auth/clear').then((res) => {
            if (res.data) {
                window.location.reload()
            }
            else {
                return;
            }
        })
            .catch((err) => console.log(err))
    }
    return (
        <div className="flex w-full items-center justify-end mt-3">
            <div className="clear">
                <button onClick={clearCart} className="clear-btns">Remove</button>
            </div>
        </div>
    )
}