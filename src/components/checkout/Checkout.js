import './checkout.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../BreadCrumps/BreadCrumps';
import CartData from './cartdata';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51QCFH6DaUdgeh2N8KwMgpA7Vii4ham8xHcGb2PQko7Nn4QXSwclqdZDoCN4aNYMsz3SshMKBLD1qq8nHs9e9LTBE00JdkaMCJB');

export default function CheckOut() {
    const [prevlocation, setPrevlocation] = useState("");
    const location = useLocation()

    useEffect(() => {
        if (!location.state) return;
        setPrevlocation(location.state.data)
    }, [location])

    return (
        <div className="checkout">
            <BreadCrumb prevlocation={prevlocation} title="checkout" />
            <div className='cart-number-information'>
                <Elements stripe={stripePromise}>
                    <CartData />
                </Elements>
            </div>
        </div>
    )
}