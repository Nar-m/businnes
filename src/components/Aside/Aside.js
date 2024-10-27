import box from '../images/box.jpg';
import banner from '../images/banner.jpg';
import { Link } from 'react-router-dom';
import WidgateBody from './WidgateBody';
import './aside.css';
import avatar from '../images/avatar3.jpg';

export default function Aside() {
    return (
        <div className="aside">
            <div className='content-wrapper relative'>
                <div className='banner-content'>
                    <div className='content-header'>
                        <div className='text'>Bacola Natural Foods</div>
                    </div>
                    <div className='content-main'>
                        <h4 className='content-title'>Special Organic</h4>
                        <h3>Roats Burger</h3>
                    </div>
                    <div className='content-footer'>
                        <span className='footer-text'>only-from</span>
                        <span className='footer-price'>$14.99</span>
                    </div>
                </div>
                <div className="content image">
                    <img src={box} alt='' />
                </div>
            </div>
            <div className='content-wrapper mt-5 relative'>
                <div className='banner-content'>
                    <div className='content-header'>
                        <div className='text'>Bacola Natural Foods</div>
                    </div>
                    <div className='content-main'>
                        <h4 className='content-title'>Special Organic</h4>
                        <h3>Roats Burger</h3>
                    </div>
                    <div className='content-footer'>
                        <span className='footer-text'>only-from</span>
                        <span className='footer-price'>$24.99</span>
                    </div>
                    <Link className='button-link' to={'#'}>
                        <button>Shop Now</button>
                    </Link>
                </div>
                <div className="content image">
                    <img src={banner} alt='' />
                </div>
            </div>
            <div className='content-wrapper mt-5'>
                <div className='elementor-widget-conteiner'>
                    <h4 className='widget-title'>Trending Products</h4>
                    <WidgateBody />
                    <h4 className='widget-title mt-5'>Customer Comment</h4>
                    <div className='market-place'>
                        <div className='customer-coment'>
                            <h4 className='entry-title'>The Best Marketplace</h4>
                            <div className='entry-message'>Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit, sed<br>
                            </br> do eiusmod tempor incididunt<br></br> ut.</div>
                            <div className='customer'>
                                <div className='avatar'>
                                    <div className='image'>
                                        <img src={avatar} alt='' />
                                    </div>
                                </div>
                                <div className='detail'>
                                    <h3 className='detail-title'>Tina Mcdonnell</h3>
                                    <span className='customer-mission'>Sales Manager</span>
                                </div>
                            </div>
                        </div>
                        <Link target='_blank' to={'https://nortun.am/'}>
                            <div className='image mt-2'>
                                <img src='https://s0.2mdn.net/simgad/874897886223561640' alt='' />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}