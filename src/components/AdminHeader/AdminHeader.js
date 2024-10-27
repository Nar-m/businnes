import './adminheader.css';
import { FaBars, FaXmark } from 'react-icons/fa6';
import SearchDrowDown from '../SearchDrowdown/SearchDrowdown';
import { useState, useContext, useEffect } from 'react';
import CountrDrowDown from './CountryDrowdown';
import { country } from '../AdminPanel/countr';
import { IoBagOutline } from 'react-icons/io5';
import { Context } from '../ContextProvider/ContenxtProvider';
import UserProfile from './UserProfile';


export default function AdminHeader(props) {
    const { togglesidebar, navbaractive, openShowCartSydbar, cart, MyDashboardPage, userProfile } = props
    const [showDrowdown, setShwoDrowdown] = useState(false);
    const [showCountryDrowdown, setShowCountryDrowdown] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(localStorage.getItem('countryselected') || 1);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const { user } = useContext(Context);

    const toggleCountryDrowDown = () => setShowCountryDrowdown(!showCountryDrowdown);
    const toggleShowProfile = () => setShowProfile(!showProfile);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    return (
        <div className={`${navbaractive ? 'admin-header active' : 'admin-header'}`} >
            <div className='header-icons'>
                <button onClick={togglesidebar} className='toogle-icons'>
                    <FaBars />
                </button>
            </div>
            <div className='admin-search-bar'>
                <div className='relative' style={{ width: '60%' }}>
                    <input onClick={() => setShwoDrowdown(true)} type='text' placeholder='Search' id='admin-search-control' />
                    <span className='search-icons'><i className="fa-solid fa-magnifying-glass"></i></span>
                    <span style={{ display: `${showDrowdown ? 'block' : 'none'}` }} onClick={() => setShwoDrowdown(false)} className='search-close'><FaXmark /></span>
                    <SearchDrowDown showDrowdown={showDrowdown} />
                </div>
            </div>
            <ul className='admin-header-navbar'>
                <li onClick={toggleTheme}>
                    <span className='cursor-pointer dark-node' style={{ color: 'white', fontSize: '18px', marginRight: '6px' }}>
                        {isDarkMode ? <i className="fa-regular fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
                    </span>
                </li>
                <li className='nav-item'>
                    <span onClick={toggleCountryDrowDown} className='nav-link country-logo'>
                        <img style={{ borderRadius: '50%' }} src={country[activeIndex].src} alt='' />
                    </span>
                    <CountrDrowDown
                        setActiveIndex={setActiveIndex}
                        activeIndex={activeIndex}
                        close={() => setShowCountryDrowdown(false)}
                        country={country}
                        showCountryDrowdown={showCountryDrowdown} />
                </li>
                <li onClick={openShowCartSydbar} className='nav-item'>
                    <span className='carticons nav-link'>
                        <IoBagOutline />
                    </span>
                    <span className='admin-carrt-count'>{cart.length}</span>
                </li>
                <li onClick={toggleShowProfile} className='nav-item'>
                    <span className='admin-picture cursor-pointer'>
                        <img src={`${user.picture ? user.picture : user.image ? require(`../files/${user.image}`)
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NPqtDfIjmzuP78QKYAk462-H_lIMRxJEIG_7exYvg_UV4dbImm-0&usqp=CAE&s'
                            }`} alt='' />
                    </span>
                    <UserProfile
                        userProfile={userProfile}
                        MyDashboardPage={MyDashboardPage}
                        close={() => setShowProfile(false)}
                        showProfile={showProfile} />
                </li>
            </ul>
        </div>
    )
}