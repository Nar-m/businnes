import { FaStar } from "react-icons/fa6"
import { Link } from "react-router-dom"
import SingelContent from "./SingleContent"

export default function ProductSingle({ viewProduct, openSldierIndex }) {
    return (
        <div className="single-wrapper">
            <div className="single-product-header">
                <h1 className="single-title">{viewProduct.text}</h1>
                <div className="product-meta-top">
                    <div className="product-rating">
                        <div className="flex items-center">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                        </div>
                        <div className="count-rating">
                            <Link to={'#'}>1 review</Link>
                        </div>
                    </div>
                </div>
            </div>
            <SingelContent openSldierIndex={openSldierIndex} viewProduct={viewProduct}/>
        </div>
    )
}