
import { useContext, useState } from "react"
import ListContent from "./ListContent";
import { Context } from "../ContextProvider/ContenxtProvider";

export default function WidgateBody() {
    const [page, setPages] = useState(1);
    const { product } = useContext(Context);
    
    const ShowMore = () => {
        if (page * 4 >= product.length - 1) {
            setPages(1)
            window.scrollTo({ top: '800', behavior: 'smooth' })
        }
        else {
            setPages(page + 1)
        }
    }

    return (
        <div className="widgate-body">
            <div className="products-list">
                {product.slice(0, page * 4).map((item, index) => {
                    return <ListContent key={index} item={item} />
                })}
            </div>
            <div className="flex items-center justify-center pt-2">
                <button onClick={ShowMore} className="show-more">{page * 4 >= product.length - 1 ? 'Less More' :
                    'Show more'}</button>
            </div>
        </div>
    )
}