import './succes.css'
import { useContext, useEffect } from 'react'
import { Context } from '../ContextProvider/ContenxtProvider'
import arrow from '../images/arrow.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SuccesLogin() {
    const { user } = useContext(Context);
    const navigate = useNavigate();

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
        <div className="succes-conteiner">
            <div className='succes-content flex relative'>
                <div>
                    <h1>Thank you <span>{user.username}</span> for signing up</h1>
                    <p>Now you can create your own business and products</p>
                </div>
                <div className='image'>
                    <img src={arrow} alt='' />
                </div>
            </div>
        </div>

    )
}