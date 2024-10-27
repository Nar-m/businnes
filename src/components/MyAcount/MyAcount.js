import './myacount.css';
import { useContext } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import { setAuthToken } from '../AuthToken/setAuthToken';
import axios from 'axios';

export default function MyAcount({ openMyaAcount, setOpenMyAcount }) {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const Logout = (event) => {
        event.preventDefault();
        axios.get("/api/auth/logout")
            .then((resp) => {
                setOpenMyAcount(false)
                navigate("/login")
                setAuthToken(null)
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className={`${openMyaAcount ? 'my-acount open' : 'my-acount'}`}>
            <div className='acount-content text-center'>
                <div className='acount-header flex items-center justify-center flex-col'>
                    <div className='image mb-4'>
                        {user.picture ? <img src={user.picture} alt='' />
                            : <img src={`${user.picture ? user.picture : user.image ? require(`../files/${user.image}`)
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NPqtDfIjmzuP78QKYAk462-H_lIMRxJEIG_7exYvg_UV4dbImm-0&usqp=CAE&s'
                                }`} alt='' />}
                    </div>
                    <div className='acount-name'>
                        <h3>{user.username} {user.surname}</h3>
                    </div>
                    <div className='acount-email mt-2'>
                        <span>{user.email}</span>
                    </div>
                </div>
                <ul className='acount-list w-full flex flex-col mt-3'>
                    <Link className='w-full' to={'/admin'}>
                        <li className='w-full flex justify-between items-center'>
                            <Button className='circle'>
                                <i className="fa-regular fa-user"></i>
                            </Button>
                            <span>My Profile</span>
                        </li>
                    </Link>
                    <Link className='w-full' to={'/wishlist'}>
                        <li className='w-full flex justify-between items-center'>
                            <Button className='circle'>
                                <i className="fa-regular fa-heart"></i>
                            </Button>
                            <span>Wishlist</span>
                        </li>
                    </Link>
                    <Link className='w-full' to={'#'}>
                        <li className='w-full flex justify-between items-center'>
                            <Button className='circle'>
                                <i className="fa-regular fa-pen-to-square"></i>
                            </Button>
                            <span>Edit profile</span>
                        </li>
                    </Link>
                    <Link onClick={Logout} className='w-full' to={'#'}>
                        <li className='w-full flex justify-between items-center'>
                            <Button className='circle'>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </Button>
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}