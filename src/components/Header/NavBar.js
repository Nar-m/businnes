import { NavLink, useLocation } from "react-router-dom"
import { navbaraItem } from "./navbarietm";


export default function Navbar() {

    const location = useLocation();

    return (
        <nav className="navbar">
            <ul className="navnar-list">
                {navbaraItem.map((item, index) => {
                    return (
                        <li key={index} className="list-inline-item">
                            <NavLink state={{ data: location.pathname.split("/")[1] }} to={`${item.link}`}>{item.item}
                                <span className="ml-2">{item.icon ? item.icon : ""}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}