import BreadCrumb from "../BreadCrumps/BreadCrumps"
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "../Filters/Filter";
import './food.css';
import FoodContent from "./FoodContent";
import axios from "axios";

export default function Foods() {
    const [prevlocation, setprevlocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [grid, setGrid] = useState(30);
    const [pages, setPages] = useState(1);
    const [selected, setSelected] = useState('grid-3')
    const location = useLocation();
    const [sortMethod, setSortMethod] = useState(localStorage.getItem('sort') || 'Sort by latest');
    const [filter, setfilter] = useState(JSON.parse(localStorage.getItem('foodCort')) ||
        { sort: "", brand: [], minPrice: "", maxPrice: "" });
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try {
                const { data } = await axios.get("/api/auth/getFoddProduct", {
                    params: {
                        ...filter,
                        brand: filter.brand.join(","),
                        minPrice: filter.minPrice,
                        maxPrice: filter.maxPrice,
                        sort: filter.sort
                    }
                })
                setFilters(data);
                setLoading(false)
                localStorage.setItem('foodCort', JSON.stringify(filter))
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchProduct()
    }, [filter])

    useEffect(() => {
        if (!location.state) return;
        setprevlocation(location.state.data);
    }, [location])

    const ChangeGridProduct = (number, text) => {
        setSelected(text)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        setGrid(number)
    }

    const productSort = (event) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
        setSortMethod(event.target.value)
        setfilter({ ...filter, sort: event.target.value })
        localStorage.setItem('sort', event.target.value)
    }
    const showMore = () => {
        if (pages * 6 >= filters.length - 1) {
            console.log('none')
        }
        else {
            setPages(pages + 1);
        }
    }

    console.log(filter)

    return (
        <div className="pt-3 conteiner">
            <div>
                <BreadCrumb prevlocation={prevlocation} title="foods" />
                <div className="filter-product">
                    <Filter
                        filter={filter}
                        setFilters={setfilter}
                    />
                </div>
            </div>
            <div className="w-100 pt-5" style={{ paddingLeft: '10rem' }}>
                <div className="food-picture">
                    <div className="image">
                        <img style={{ borderRadius: '7px' }} src="https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-18.jpg" alt="" />
                    </div>
                </div>
                <div className="befoore-shop-loop mt-3">
                    <div className="show-view-selector">
                        <Link style={{ color: `${selected === 'grid-1' ? 'black' : '#c2c2d3'}` }} onClick={() => ChangeGridProduct(70, 'grid-1')} to={'#'}>
                            <i className="fa-solid fa-bars"></i>
                        </Link>
                        <Link style={{ color: `${selected === 'grid-2' ? 'black' : '#c2c2d3'}` }} onClick={() => ChangeGridProduct(50, 'grid-2')} to={'#'}><i className="fa-solid fa-border-all"></i></Link>
                        <Link style={{ color: `${selected === 'grid-3' ? 'black' : '#c2c2d3'}` }} onClick={() => ChangeGridProduct(30, 'grid-3')} to={'#'}><i className="fa-solid fa-table-cells"></i></Link>
                    </div>
                    <form className="filter-sort">
                        <span>Sort By</span>
                        <select value={sortMethod} onChange={productSort} className="orderBy">
                            <option value="Sort by latest">Sort by latest</option>
                            <option value="Sort by popularity">Sort by popularity</option>
                            <option value="Sort by average rating">Sort by average rating</option>
                            <option value="Sort by price: low to high">ort by price: low to high</option>
                        </select>
                    </form>
                </div>
                {loading ? <div className="loading pt-3">
                    <div className="load"></div>
                </div> : <div className="flex flex-col">
                    <FoodContent
                        showMore={showMore}
                        filters={filters}
                        setFilters={setfilter}
                        pages={pages} grid={grid} />
                </div>}
            </div>
        </div>
    )
}