import './admincart.css';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import { useEffect } from 'react';

export default function AdminCart({ showCartSydbar, closeHideCartSydbar, setCart, cart }) {

    const deleteAdminProduct = async (id) => {
        try {
            const resposeve = await axios.delete(`/api/auth/removeProductAdmin/${id}`);
            if(resposeve.data) {
                window.location.reload();
            }
        }

        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get("/api/auth/getadmincart")
            .then((resposeve) => setCart(resposeve.data))
            .catch((error) => console.log(error));
    }, [])

    return (
        <div className='show-conteiner'>
            <div onClick={closeHideCartSydbar} className={`${showCartSydbar ? 'content-item active' : 'content-item'}`}></div>
            <div className={`${showCartSydbar ? 'admin-cart show' : 'admin-cart'}`}>
                <div className='cart-admin-header flex justify-between items-center'>
                    <h5 className='cart-title'>{cart.length}  New Orders</h5>
                    <span onClick={closeHideCartSydbar}><FaXmark /></span>
                </div>
                <div className='of-canvas'>
                    <div className='order-list'>
                        {cart?.map((element, index) => {
                            return (
                                <div className='order-item' key={index}>
                                    <div className='order-img'>
                                        <img src={element.image ? require(`../files/${element.image}`) : element.picture} alt='' />
                                    </div>
                                    <div className='cart-info'>
                                        <h5 className='order-title mb-1'>{element.title}</h5>
                                        <p className='order-price'>${element.price}</p>
                                    </div>
                                    <span onClick={() => deleteAdminProduct(element._id)} className="material-icons-outlined"><i className="fa-solid fa-trash"></i></span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='cart-footer'>
                    <button className='cart-futter-btns'>View Products</button>
                </div>
            </div>
        </div>
    )
}