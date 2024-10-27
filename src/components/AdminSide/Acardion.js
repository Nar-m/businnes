import { Link } from "react-router-dom"


export default function Acardion({ name, lastName, toggleAcardion, open, showProduct }) {
    return (
        <ul className={`${toggleAcardion ? 'acardion-home active' : 'acardion-home'} side-page-item`}>
            <li>
                <Link onClick={showProduct}  to={'#'}>
                    <div className='parent-icons'><i className="fa-solid fa-caret-right"></i></div>
                    <div className='menu-title'>{name}</div>
                </Link>
            </li>
            <li>
                <Link onClick={open} to={'#'}>
                    <div className='parent-icons'><i className="fa-solid fa-caret-right"></i></div>
                    <div className='menu-title'>{lastName}</div>
                </Link>
            </li>
        </ul>
    )
}