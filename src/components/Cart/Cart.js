import './cart.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../BreadCrumps/BreadCrumps';
import CartProgress from './CartProgress';
import CartItem from './CartItem';
import CartBootom from './CartBootom';
import CartTotals from './CartTotals';
import Empty from '../empty/Empty';
import emptycart from '../images/emptycart.png'

export default function Cart() {
    const { cart } = useContext(Context);
    const [prevlocation, setprevlocation] = useState("");
    const location = useLocation();
    
    useEffect(() => {
        if (!location.state) return;
        setprevlocation(location.state.data)
    }, [location])

    return (
        <div className='cart pt-2  pr-20'>
            <BreadCrumb prevlocation={prevlocation} title="cart" />
            {cart.length === 0 ? <Empty text="cart" empty={emptycart}/> :  <div className='flex w-full'>
                <div className='cart-product'>
                    <CartProgress />
                    <div className='cart-conteiner'>
                        <table className='cart-table'>
                            <thead>
                                <tr>
                                    <th className='product-img'>Picture</th>
                                    <th className='product-name'>Text</th>
                                    <th className='product-price'>Price</th>
                                    <th className='product-quantity'>Quantity</th>
                                    <th className='product-subtotal'>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.map((item, index) => {
                                    return (
                                        <CartItem item={item} key={index} />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <CartBootom />
                </div>
                <CartTotals />
            </div>}
        </div>
    )
}