import { useContext } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"
import './modalwishlist.css';
import { FaHeart, FaXmark } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ModalWishlist() {
    const { element, modalWishlist, closeWishlistModal, setModalWishlist, wishlist } = useContext(Context)
    const checkButtonsText = wishlist.find((item) => item._id === element._id) ? "remove Wishlist" : "View Wishlist";

    const navigate = useNavigate();

    const addToWishlist = async () => {
        const resp = await axios.post("/api/auth/addtoWishlist", element)
        if (resp.data.succes) {
            setModalWishlist(false);
            navigate("/wishlist")
            window.location.reload()
        }
    }
    return (
        <div onClick={(ev) => {
            if (ev.target.className === 'modal-wishlist open') {
                closeWishlistModal()
            }
        }} className={`${modalWishlist ? 'modal-wishlist open' : 'modal-wishlist'}`}>
            <div className="overlay-content">
                <div className="circle-close"><i style={{
                    fontSize: '60px'

                }} className="fa-regular fa-circle-xmark"></i></div>
                <div style={{ textAlign: 'center', fontSize: '17px', lineHeight: '28px' }}>
                    Foster Farms Takeout Crispy Classic<br></br> Buffalo Wings already in Wishlist
                </div>
                <button onClick={addToWishlist} className="modal-overlay-btns"><FaHeart /> <span style={{ marginLeft: '6px' }}>{checkButtonsText}</span></button>
                <button onClick={closeWishlistModal} className="modal-overlay-btns"><FaXmark /> <span style={{ marginLeft: '6px' }}>Close</span></button>
            </div>
        </div>
    )
}