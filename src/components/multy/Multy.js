import './multy.css';
import { FaXmark } from 'react-icons/fa6';

export default function Multy({ filters, setFilters }) {
    const removeProductChaecbox = (item, type) => {
        setFilters((filters) => {
            const removeMultyItem = filters[type].filter((el) => el !== item);
            return { ...filters, [type]: removeMultyItem }
        })
    }
    return (
        <div className="flex items-center mb-3 flex-wrap">
            {filters.category?.map((el, ind) => <div key={ind} className='multy-item'>{el} <FaXmark onClick={() => removeProductChaecbox(el, 'category')} /></div>)}
            {filters.brand?.map((el, ind) => <div key={ind} className='multy-item'>{el} <FaXmark onClick={() => removeProductChaecbox(el, 'brand')} /></div>)}
            {filters.color?.map((el, ind) => <div key={ind} className='multy-item'>{el} <FaXmark onClick={() => removeProductChaecbox(el, 'color')} /></div>)}
            {filters.country?.map((el, ind) => <div key={ind} className='multy-item'>{el} <FaXmark onClick={() => removeProductChaecbox(el, 'country')} /></div>)}
            {filters.size?.map((el, ind) => <div key={ind} className='multy-item'>{el} <FaXmark onClick={() => removeProductChaecbox(el, 'size')} /></div>)}
        </div>
    )
}