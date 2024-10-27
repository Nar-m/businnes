import './main.css';
import Sliders from '../sliders/Sliders';
import Carusel from '../Home/Carusel';
import ProductFor from '../productFor/ProductFor';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import FoodProduct from '../FoodProduct/FoodProduct';

export default function Main() {
    return (
        <div className='pl-10 pt-4'>
            <Sliders />
            <Carusel />
            <ProductFor />
            <div className='module-body'>
                <Link to={'#'}>
                    <span className='purchase-text'>
                        Super discount for your
                        <strong>first purchase.</strong>
                    </span>
                   <Link onClick={() => window.scrollTo({top: '0', behavior: 'instant'})} to={'/food'}> <span className='purchase-code'>hshssh</span></Link>
                    <span className='purchase-description'>Use discount code in checkout!</span>
                </Link>
            </div>
            <div className="carusel-header flex justify-between mt-5 items-center">
                <div className="carusel-title">
                    <h4>NEW PRODUCTS</h4>
                    <div className='entry-description'>New products with updated stocks.</div>
                </div>
                <div className="view-all">
                    <Link to={'/food'}>View All <FaArrowRight /></Link>
                </div>
            </div>
            <FoodProduct />
            <div className='flex mt-3 justify-between items-center'>
                <div style={{ borderRadius: '7px' }} className='wrapper relative'>
                    <div className='wrapper-content'>
                        <div className='content-header'>
                            <div>WEEKEND DISCOUNT 40%</div>
                        </div>
                        <div className='content-main'>
                            <h3>Legumes &<br></br> Cereals</h3>
                            <div className='entry-text'>Feed your family the best </div>
                        </div>
                        <Link to={'#'}>
                            <button>Shop Now</button>
                        </Link>
                    </div>
                    <div className='image'>
                        <img style={{ borderRadius: '7px' }} src={'https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-01.jpg'} alt='' />
                    </div>
                </div>
                <div style={{ borderRadius: '7px' }} className='wrapper relative'>
                    <div className='wrapper-content'>
                        <div className='content-header'>
                            <div>WEEKEND DISCOUNT 40%</div>
                        </div>
                        <div className='content-main'>
                            <h3>Dairy & Eggs</h3>
                            <div className='entry-text'>A different kind of grocery store  </div>
                        </div>
                        <Link to={'#'}>
                            <button>Shop Now</button>
                        </Link>
                    </div>
                    <div className='image'>
                        <img style={{ borderRadius: '7px' }} src={'https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-02.jpg'} alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}