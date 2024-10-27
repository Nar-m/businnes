import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6"
import ProductOffer from "../ProductOffer/ProductOffer"


export default function ProductFor() {
    return (
        <div className="pt-5 w-full">
            <div className="flex items-center justify-between">
                <div className="carusel-title">
                    <h4>HOT PRODUCT FOR THIS WEEK</h4>
                    <div className='entry-description'>Dont miss this opportunity at a special discount just for this week.</div>
                </div>
                <div className="view-all">
                    <Link to={'/food'}>View All <FaArrowRight /></Link>
                </div>
            </div>
            <ProductOffer />
        </div>
    )
}