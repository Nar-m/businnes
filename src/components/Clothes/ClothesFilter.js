
import { filter } from "../filter/filter"
import { useContext, useState } from "react";
import { Context } from "../ContextProvider/ContenxtProvider";

export default function ClothesFilter({ filters, setFilters }) {
    const { productRef } = useContext(Context);
    const [pages, setPages] = useState(1);

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;
        setFilters((filters) => {
            const updatedFilter = checked
                ? [value, ...filters[type]]
                : filters[type].filter((item) => item !== value);
            return { ...filters, [type]: updatedFilter, curentPages: 1 };
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((filters) => ({ ...filters, [name]: value, curentPages: 1 }));
    };
    const ShowMore = (page, array) => {
        if (page * 5 >= array.length - 1) {
            setPages(1)
        }
        else {
            setPages(page + 1)
        }
    }
    return (
        <div ref={productRef} className="product-filter" style={{ width: '250px' }}>
            <div className="flex flex-col">
                <ul className="gender p-3">
                    <h2>Gender</h2>
                    {filter[0].map((item, index) => {
                        return (
                            <li key={index}>
                                <label htmlFor="gender">
                                    <input value={item} onChange={(event) => {
                                        handleInputChange(event)
                                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })
                                    }} id="gender" name="gender" type="radio" />
                                    <span id="gender" onClick={() => {
                                        setFilters((filters) => ({ ...filters, gender: item }))
                                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })
                                    }} className="name cursor-pointer ml-3">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
                <ul className="p-3 border-t mt-2">
                    <h2>Category</h2>
                    {filter[1].map((item, index) => {
                        return (
                            <li key={index}>
                                <label className="flex" htmlFor="category">
                                    <input checked={filters.category.includes(item)} value={item} onChange={(event) => {
                                        handleCheckboxChange(event, 'category')
                                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })
                                    }} id="category" name="category" type="checkbox" />
                                    <span className="name cursor-pointer ml-3">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
                <ul className="p-3 border-t mt-2">
                    <h2>Brand</h2>
                    {filter[2].slice(0, pages * 5).map((item, index) => {
                        return (
                            <li className="animated" key={index}>
                                <label className="flex" htmlFor="brand">
                                    <input checked={filters.brand.includes(item)} value={item} onChange={(event) => {
                                        handleCheckboxChange(event, 'brand')
                                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })
                                    }} id="brand" name="brand" type="checkbox" />
                                    <span className="name cursor-pointer ml-3">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                    <button onClick={() => ShowMore(pages, filter[2])} className="mt-2 flex">Show More {pages * 5 >= filter[2].length - 1 ? '-2' : '+5'}</button>
                </ul>
                <ul className="p-3 border-t mt-2">
                    <h2>Color</h2>
                    {filter[3].map((item, index) => {
                        return (
                            <li key={index}>
                                <label className="flex" htmlFor="color">
                                    <input checked={filters.color.includes(item)} value={item} onChange={(event) => {
                                        handleCheckboxChange(event, 'color')
                                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })
                                    }} id="color" name="color" type="checkbox" />
                                    <span style={{
                                        background: `${item === 'white, green' ? '#d3f4e1' : item === 'white' ? '#f5f4f3' : item}`,
                                    }} className="circe ml-3"></span>
                                    <span className="name cursor-pointer ml-3">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
                <ul className="p-3 border-t mt-2">
                    <h2>Country</h2>
                    {filter[4].map((item, index) => {
                        return (
                            <li key={index}>
                                <label className="flex" htmlFor="country">
                                    <input checked={filters.country.includes(item)} value={item} onChange={(event) => {
                                        handleCheckboxChange(event, 'country')
                                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })

                                    }} id="country" name="country" type="checkbox" />
                                    <span className="name cursor-pointer ml-3">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
                <ul className="p-3 border-t mt-2">
                    <h2>Size</h2>
                    {filter[5].map((item, index) => {
                        return (
                            <li key={index}>
                                <label className="flex" htmlFor="size">
                                    <input checked={filters.size.includes(item)} value={item} onChange={(event) => {
                                        handleCheckboxChange(event, 'size')
                                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'smooth' })
                                    }} id="size" name="size" type="checkbox" />
                                    <span className="name cursor-pointer ml-3">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
                <ul className="filter-price flex flex-col p-3 border-t mt-2">
                    <h2>Price</h2>
                    <input className="mb-3" onChange={handleInputChange} name="minPrice" type="range" />
                    <input type="range" name="maxPrice" onChange={handleInputChange} />
                    <div className="mt-2">
                        <span>$ {filters.minPrice === "" ? "0" : filters.minPrice}
                            -  ${filters.maxPrice === "" ? "0" : filters.maxPrice}</span>
                    </div>
                </ul>
            </div>
        </div>
    )
}