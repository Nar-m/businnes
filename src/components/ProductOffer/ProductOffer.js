import { Link, useLocation } from 'react-router-dom';
import CountdownProgress from '../CountDownprogress/CountDownProgress';
import { Context } from '../ContextProvider/ContenxtProvider';
import { useContext } from 'react';

export default function ProductOffer() {
    const { product } = useContext(Context)
    const location = useLocation()
    return (
        <div className="mt-5 offer-conteiner">
            <div className="offer-content">
                {product?.map((item, index) => {
                    if (item.description === 'Chobani Complete Vanilla Greek Yogurt') {
                        return (
                            <>
                                <div key={index} className='relative'>
                                    <div className='hot-sale'>{item.discount}%</div>
                                    <Link to={`/productdetalis/${item._id}`} state={{ data: location.pathname.split("/")[1] }}>
                                        <div className='image'>
                                            <img src={item.src} alt='' />
                                        </div>
                                    </Link>
                                </div>
                                <div key={index} className='product-descript'>
                                    <span className='price'>
                                        <del>${item.del}</del>
                                        <ins>${item.price}</ins>
                                        <h3>
                                            <Link to={'#'}>{item.description}</Link>
                                        </h3>
                                        <CountdownProgress />
                                    </span>
                                </div>
                            </>
                        )
                    }
                })}
            </div>
        </div>
    )
}