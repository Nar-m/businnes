import './wihslist.css';
import { useContext, useEffect } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"
import WishlistContent from './WishlistContent';
import axios from 'axios';
import Empty from '../empty/Empty';
import { useNavigate } from 'react-router-dom';
import emptywishlsit from '../images/wishlist.png';

export default function Wishlist() {
    const { wishlist } = useContext(Context);
    const navigate = useNavigate();

    const allItemToCart = async () => {
        const resp = await axios.get("/api/auth/allitemToCart")
        if (resp.data) {
            window.location.reload()
        }
    }
    useEffect(() => {
        axios.get("/api/auth/authmiddleware")
            .then((resp) => {
                if (!resp.data.token) {
                    navigate("/login")
                }
            })
            .catch((err) => console.log(err))
    }, [])
    return (
        <div className="wishlist-conteiner">
            <div className='wishlist-header'>
                <h2>Default wishlist</h2>
            </div>
            {wishlist.length === 0 ? <Empty text="wishlist" empty={emptywishlsit} /> : <div className='wishlist-content'>
                <table className='wishlist-table'>
                    <thead className='wishlist-head'>
                        <tr>
                            <th className='wishlist-cb'>
                                <input type='checkbox' />
                            </th>
                            <th className='wishlist-remove'></th>
                            <th className='wishlist-picture'></th>
                            <th className='wishlist-name'>
                                <span>Product name</span>
                            </th>
                            <th className='wishlist-price'>
                                <span>Unit Price</span>
                            </th>
                            <th className='wishlist-status'>
                                <span>Stock Status</span>
                            </th>
                            <th className='wishlist-btns'>

                            </th>
                        </tr>
                    </thead>
                    <tbody className='wishlist-body'>
                        {wishlist?.map((item, index) => {
                            return <WishlistContent key={index} item={item} />
                        })}
                    </tbody>
                </table>
                <div className='wishlist-footer flex items-center justify-between border-1 pt-3 pb-3'>
                    <div className='flex items-center mt-2'>
                        <div className='select'>
                            <select className='select-wishlist-action'>
                                <option value="actions">actions</option>
                                <option value="addToCart">addToCart</option>
                                <option value="remove">remvoe</option>
                            </select>
                        </div>
                        <div className='wishlist-btns ml-3'>
                            <button style={{ width: '150px' }}>Apply Action</button>
                        </div>
                    </div>
                    <div className='wishlist-btns flex'>
                        <button style={{ width: '200px' }} className='mr-3'>Add Selected to Cart</button>
                        <button onClick={allItemToCart} style={{ width: '200px' }}>Add All to Cart</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}