import './clothes.css';
import ClothesSliders from './ClothesSlider';
import ClothesCarusel from './Clothescarusel';
import banner from '../images/banner-box2.jpg';
import { Link } from 'react-router-dom'
import CountDown from './CountDown';
import { useState, useEffect } from 'react';
import ClothesContent from './ClothesContent';
import ClothesFilter from './ClothesFilter';
import { FaChevronDown } from 'react-icons/fa6';
import SelectedContent from './SelectedContent';
import axios from 'axios';

const obj = JSON.parse(localStorage.getItem('filters')) || {
    sort: "",
    gender: "",
    category: [],
    brand: [],
    color: [],
    country: [],
    size: [],
    minPrice: "",
    maxPrice: "",
    curentPages: 1,
    limit: 10
}

export default function Clothes() {
    const [sliderProgress, setSliderProgress] = useState(0);
    const [selectSort, setSelectedSort] = useState(localStorage.getItem('selected-sort') || "Recommended");
    const [filters, setFilters] = useState(obj)
    const [totalPages, setTotalPages] = useState(0);
    const [openSelectContent, setOpenSelctContent] = useState(false);
    const [productShop, setproductShop] = useState([]);

    const getProductClothes = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const getProduct = await axios.get(`/api/auth/getClothesProduct?query=${query}`);
            setproductShop(getProduct.data.data);
            setTotalPages(getProduct.data.totalProduct);
            localStorage.setItem('filters', JSON.stringify(filters));
        }
        catch (err) {
            console.log(err);
        }
    }
    const selectedarrow = ['Recommended', 'Whats new', 'Popularity', 'Better Discount', 'Price: High to Low', 'Low to High', 'Customer Rating'];

    const ChangeSortProduct = (select) => {
        setSelectedSort(select);
        setFilters({ ...filters, sort: select });
        localStorage.setItem('selected-sort', select);
    }
    const showSelectitem = () => setOpenSelctContent(!openSelectContent);
    const closeSelectitem = () => setOpenSelctContent(false);

    useEffect(() => {
        getProductClothes();
    }, [filters])

    const handlePageChange = (number) => {
        setFilters({ ...filters, curentPages: number });
    }

    return (
        <>
            <div className="clothes-conteiner">
                <ClothesSliders setSliderProgress={setSliderProgress} />
                <div className="slider-progress">
                    <div style={{ width: `${sliderProgress}%` }} className="progress-result"></div>
                </div>
                <div className='clothes-widgats'>
                    <div>
                        <h3 className='enty-title'> without contacting the courier</h3>
                    </div>
                    <div className='banner-tubnail'>
                        <div className='image'>
                            <img src={banner} alt='' />
                        </div>
                    </div>
                    <div className='shop-now'>
                        <Link to={'#'}>
                            <button>Shop Now</button>
                        </Link>
                    </div>
                </div>
                <ClothesCarusel />
                <div className='module-haeder flex items-center justify-center mt-4'>
                    <div className='column mr-6'>
                        <h4 className='entry-title'>
                            Special Offers
                            <span>of the week!</span>
                        </h4>
                        <div className='entry-description'>
                            Ut placerat, magna quis porttitor vulputate, magna nunc auctor ante.
                        </div>
                    </div>
                    <div className='column'>
                        <CountDown />
                    </div>
                </div>
                <div className='w-full relative'>
                    <div className='flex justify-between items-center mt-5 w-full'>
                        <div className='title flex items-center relative'>
                            <h2>Filters</h2>
                        </div>
                        <div className='filter-sort-select border-1'>
                            <div className='select'>
                                <div onClick={showSelectitem} className='select-header cursor-pointer w-full flex items-center justify-between'>
                                    <div>
                                        <span className='sort-name'>
                                            <span>Sort by:</span><strong className='ml-2'>{selectSort}</strong></span>
                                    </div>
                                    <div className='arrow-sort'>
                                        <button style={{
                                            transform: `rotate(${openSelectContent ? '180deg' : '0deg'})`
                                        }}><FaChevronDown /></button>
                                    </div>
                                </div>
                                <ul style={{ display: `${openSelectContent ? 'block' : 'none'}` }}
                                    className='selected-content absolute bg-white'>
                                    {selectedarrow?.map((items, index) => {
                                        return <SelectedContent
                                            closeSelectitem={closeSelectitem}
                                            ChangeSortProduct={ChangeSortProduct}
                                            checkClass={selectSort === items ? "selected-items active" : "selected-items"}
                                            items={items} key={index} />
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-start w-full border-t mt-4'>
                    <ClothesFilter setFilters={setFilters}
                        filters={filters}
                    />
                    <ClothesContent
                        prevPages={() => setFilters({ ...filters, curentPages: filters.curentPages - 1 })}
                        nextPages={() => setFilters({ ...filters, curentPages: filters.curentPages + 1 })}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        curentPages={filters.curentPages}
                        setFilters={setFilters}
                        filters={filters}
                        productShop={productShop} />
                </div>
            </div>
        </>
    )
}