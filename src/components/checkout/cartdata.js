

import { useState, useContext } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CartData() {
    const { cart } = useContext(Context)
    const stripe = useStripe();
    const elements = useElements();
    const [paymentStatus, setPaymentStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        if (!stripe || !elements) {
            return;
        };
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            setLoading(false)
            setPaymentStatus('Payment failed');
        }
        else {
            const response = await fetch('http://localhost:5000/api/auth/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cart)
            })
            const { clientSecret } = await response.json();

            const confirmResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmResult.error) {
                setLoading(false);
                setPaymentStatus('Payment failed');
            } else if (confirmResult.paymentIntent.status === 'succeeded') {
                setPaymentStatus('Payment successful');
            }
            setLoading(false);
        }
    }
    return (
        <div className='number-content'>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>{loading ? "Processing..." : "Pay"}</button>
                {paymentStatus && <p>{paymentStatus}</p>}
            </form>
        </div>
    )
}