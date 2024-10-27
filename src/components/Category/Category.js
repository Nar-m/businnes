import './category.css';
import { useContext } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import { Link } from 'react-router-dom';
import {
    FaBacon,
    FaBowlFood,

} from 'react-icons/fa6';

export default function Category() {
    const { showCategory} = useContext(Context);
    return (
        <div className='category-side'>
            <div className={`${showCategory ? 'category show' : 'category'}`}>
                <ul className='category-list'>
                    <li className='category-link'>
                        <Link to={'/food'}>
                            <span>
                                <FaBowlFood className='logo-svg' />
                            </span>
                            <span> Meats & Seafood</span>
                            <span>

                            </span>
                        </Link>
                    </li>
                    <li   className='category-link'>
                        <Link to={'/clothes'}>
                            <span>
                                <FaBacon className='logo-svg' />
                            </span>
                            <span>Clothes</span>
                            <span>

                            </span>
                        </Link>
                    </li>
                    <div className='parent-item'>
                        <li className='link-parent'>
                            <Link to={'#'}> Value of the Day</Link>
                        </li>
                        <li className='link-parent'>
                            <Link to={'#'}> Top 100 Offers</Link>
                        </li>
                        <li className='link-parent'>
                            <Link to={'#'}> New Arrivals</Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}