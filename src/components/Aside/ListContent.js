import { Link, useLocation } from "react-router-dom";

export default function ListContent({ item }) {
    const location = useLocation();

    return (
        <div className="list-content active">
            <div className="flex mt-4 ">
                <Link to={`/productdetalis/${item._id}`} state={{ data: location.pathname.split("/")[1] }}>
                    <div className="image">
                        <img src={item.src} alt="" />
                    </div>
                </Link>
                <div className="list-content">
                    <h3>
                        <Link to={`/productdetalis/${item._id}`} state={{ data: location.pathname.split("/")[1] }}>{item.text}</Link>
                    </h3>
                    <span className="list-price">
                        <del>${item.del}</del>
                        <ins>
                            ${item.price}
                        </ins>
                    </span>
                </div>
            </div>
        </div>
    )
}