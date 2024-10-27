import { Link, useLocation } from 'react-router-dom'
import Country from '../country/Country';
import Search from '../search/Search';
import Button from '@mui/material/Button'
import { FaRegCircleUser, FaAngleDown } from 'react-icons/fa6';
import { IoBagOutline } from 'react-icons/io5';
import { IoIosMenu } from 'react-icons/io';
import Navbar from './NavBar';
import { useContext, useState } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import MyAcount from '../MyAcount/MyAcount';


export default function Header({ logo }) {
    const { showcategory, user, cart, wishlist, showCategory } = useContext(Context);
    const location = useLocation();
    const [openMyaAcount, setOpenMyAcount] = useState(false);

    const toggleMyAcountDrowdown = () => setOpenMyAcount(!openMyaAcount);
    
    const checkUserCircle = () => {
        if (localStorage.getItem('token')) {
            return <div className='flex items-center'>
                <Button onClick={toggleMyAcountDrowdown} className='circle succes'>
                    <img src={`${user.picture ? user.picture : user.image ? require(`../files/${user.image}`) :
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NPqtDfIjmzuP78QKYAk462-H_lIMRxJEIG_7exYvg_UV4dbImm-0&usqp=CAE&s'
                        }`} alt='' />
                </Button>
                <span onClick={toggleMyAcountDrowdown}
                    style={{ transform: `rotate(${openMyaAcount ? '180deg' : '0deg'})`, transition: 'all 0.3s ease-in-out' }}
                    className='cursor-pointer'><FaAngleDown /></span>
            </div>
        }
        else {
            return <Link to={'/login'}>
                <Button className='circle'><FaRegCircleUser /></Button>
            </Link>
        }
    }

    return (
        <header className="header" >
            <div className='flex flex-col'>
                <div className='flex items-center justify-around pt-5 pl-20 pr-20' >
                    <div className='wrapper flex'>
                        <div className='logo'>
                            <div className='image col-sm-2'>
                                <Link to={'/'}>
                                    <img src={logo} alt='' />
                                </Link>
                            </div>
                        </div>
                        <Country />
                    </div>
                    <div className='wrapper' style={{ width: '50%' }}>
                        <Search />
                    </div>
                    <div className='wrapper flex items-center'>
                        <div className='mr-3'>
                            {checkUserCircle()}
                        </div>
                        <Link state={{ data: location.pathname.split("/")[1] }} to={'/cart'}>
                            <div className='cart-tab relative'>
                                <Button className='circle'><IoBagOutline /></Button>
                                <span className='count flex items-center justify-center'>{cart.length}</span>
                            </div>
                        </Link>
                        {localStorage.getItem('token') ? <Link state={{ data: location.pathname.split("/")[1] }} to={'/wishlist'}>
                            <div className='relative ml-3'>
                                <i style={{ fontSize: '25px' }} className="fa-regular fa-heart"></i>
                                <span style={{ width: '20px', height: '20px', right: '-13px' }} className='count flex items-center justify-center'>{wishlist.length}</span>
                            </div>
                        </Link> : null}
                    </div>
                </div>
                <div className='flex items-center justify-between pb-2 pt-5' style={{ paddingRight: '150px', paddingLeft: '120px' }} >
                    <div className='nav'>
                        <div className='row'>
                            <div className='col-sm-3 relative'>
                                <Button onClick={showcategory} className='allCatab'>
                                    <span><IoIosMenu /></span>
                                    <span style={{ fontWeight: '600', whiteSpace: 'nowrap' }} className='all-category'>ALL CATEGORIES</span>
                                    <span style={{
                                        marginLeft: '12px', transform: `rotate(${showCategory ? '180deg' : '0deg'
                                            })`
                                    }}><FaAngleDown /></span>
                                </Button>
                                <div className='description'>TOTAL 63 PRODUCTS</div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <Navbar />
                    </div>
                </div>
            </div>
            <MyAcount setOpenMyAcount={setOpenMyAcount} openMyaAcount={openMyaAcount} />
        </header>
    )
}
