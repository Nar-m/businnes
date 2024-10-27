import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifyEmail() {
    const { randoms } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/verify/${randoms}`);
                setMessage(response.data.message);
                navigate('/login')
            } catch (error) {
                setMessage(error.response.data.message);
            }
        };
        verifyEmail();
    }, [randoms, navigate]);

    return (
        <div>
            <span>{message}</span>
        </div>
    )
}
