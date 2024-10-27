import './adminside.css';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';
import Acardion from './Acardion';
import { useState } from 'react';

export default function AdminSide(props) {
    const { togglesidebar, MyDashboardPage, MyAddProdcut, UserProfile, MyProduct } = props
    const [toggleAcardion, setToggleAcardion] = useState(false);
    const [toggleCompontens, setToggleComponents] = useState(false);
    const [toggleCommerse, setToggleComerse] = useState(false);

    const ToggleAcardion = () => setToggleAcardion(!toggleAcardion);
    return (
        <aside className={`${togglesidebar ? 'admin-side active' : 'admin-side'}`}>
            <div className='side-content w-full flex flex-col'>
                <div className='sydbar-logo flex items-center'>
                    <div style={{ width: '45px', height: '34px' }} className='lmage'>
                        <img src='https://codervent.com/maxton/demo/vertical-menu/assets/images/logo-icon.png' alt='' />
                    </div>
                    <div className='logo-name ml-3'>
                        <h5>Maxton</h5>
                    </div>
                </div>
                <div className='w-full mt-3'>
                    <ul className='side-page-item w-full flex flex-col'>
                        <li>
                            <Link onClick={ToggleAcardion} to={'#'}>
                                <div className='flex items-center'>
                                    <div className='parent-icons'><i className="fa-solid fa-house"></i></div>
                                    <div className='menu-title'>Dashboard</div>
                                </div>
                                <div style={{ transform: `rotate(-${toggleAcardion ? '90deg' : '0deg'})` }} className='menu-arrow'>
                                    <FaChevronLeft />
                                </div>
                            </Link>
                            <Acardion open={MyDashboardPage} toggleAcardion={toggleAcardion} name="My Dashboard" lastName="eCommerce" />
                        </li>
                        <li>
                            <Link onClick={UserProfile} to={'#'}>
                                <div className='flex items-center'>
                                    <div className='parent-icons'><i className="fa-solid fa-user"></i></div>
                                    <div className='menu-title'>User profile</div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setToggleComponents(!toggleCompontens)} to={'#'}>
                                <div className='flex items-center'>
                                    <div className='parent-icons'><i className="fa-solid fa-border-all"></i></div>
                                    <div className='menu-title'>Components</div>
                                </div>
                                <div style={{ transform: `rotate(-${toggleCompontens ? '90deg' : '0deg'})` }} className='menu-arrow'>
                                    <FaChevronLeft />
                                </div>
                            </Link>
                            <Acardion toggleAcardion={toggleCompontens} name="Pagination" lastName="Alerts" />
                        </li>
                        <li>
                            <Link onClick={() => setToggleComerse(!toggleCommerse)} to={'#'}>
                                <div className='flex items-center'>
                                    <div className='parent-icons'><i className="fa-solid fa-briefcase"></i></div>
                                    <div className='menu-title'>eCommersc</div>
                                </div>
                                <div style={{ transform: `rotate(-${toggleCommerse ? '90deg' : '0deg'})` }} className='menu-arrow'>
                                    <FaChevronLeft />
                                </div>
                            </Link>
                            <ul className={`${toggleCommerse ? 'acardion-home active' : 'acardion-home'} side-page-item`}>
                                <li>
                                    <Link onClick={MyProduct} to={'#'}>
                                        <div className='parent-icons'><i className="fa-solid fa-caret-right"></i></div>
                                        <div className='menu-title'>Product</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={MyAddProdcut} to={'#'}>
                                        <div className='parent-icons'><i className="fa-solid fa-caret-right"></i></div>
                                        <div className='menu-title'>Add Products</div>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}