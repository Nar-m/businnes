import './search.css';
import { Link, useLocation } from 'react-router-dom';
import EmptySearch from './emptySearch';

export default function SearchProduct(props) {
    const { closeSeachConteiner, search, query } = props
    const location = useLocation();
    return (
        <div className="search-product">
            <ul>
                {search.length === 0 ? <EmptySearch query={query}/> : search?.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${item._id}`}>
                                <div onClick={closeSeachConteiner} className='image'>
                                    <img src={item.src} alt='' />
                                </div>
                            </Link>
                            <div className='search-content'>
                                <Link state={{ data: location.pathname.split("/")[1] }} to={`/productdetalis/${item._id}`}>
                                    <h1 onClick={closeSeachConteiner}>{item.text}</h1></Link>
                                <span className='price'>
                                    <del>{item.del}</del>
                                    <ins>{item.price}</ins>
                                </span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}