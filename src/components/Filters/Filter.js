
export default function Filter({ setFilters, filter }) {
    const brand = [
        'Oreo, Quaker, Welchs',
        'Breakfast & Dairy',
        'Frito Lay, Oreo, Welchs',
        'Welchs',
        'Grocery & Staples'
    ]
    
    const HandleCheckBoxFilter = (event, type) => {
        const { value, checked } = event.target;
        setFilters((filter) => {
            const updatedFilter = checked
                ? [value, ...filter[type]]
                : filter[type].filter((item) => item !== value);
            return { ...filter, [type]: updatedFilter };
        })
    }

    return (
        <div className="product-filter">
            <h4 className="filter-title">Product Brand</h4>
            <div className="filter-checkbox">
                <ul className="mt-3">
                    {brand.map((item, index) => {
                        return (
                            <li key={index}>
                                <label className="flex" htmlFor="checked">
                                    <input checked={filter.brand.includes(item)} value={item} onChange={(event) => {
                                        HandleCheckBoxFilter(event, 'brand')
                                    }} className="mr-4" type="checkbox" name="checked" id="checked" />
                                    <span id="checked">{item}</span>
                                </label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="filter-price">
                <h2 className="filter-title">FILTER BY PRICE</h2>
                <div className="filter-by-price mt-3 w-full">
                    <form id="category-price">
                        <input className="mb-3" name="minPrice" onChange={(ev) => setFilters({ ...filter, minPrice: ev.target.value })} type="range" />
                        <input name="maxPrice" onChange={(ev) => setFilters({...filter, maxPrice: ev.target.value})} type="range" />
                        <div className="flex items-center justify-between">
                            <span className="name">Price: <span style={{ color: '#202435' }}>$ {filter.minPrice === "" ? "0" : filter.minPrice} 
                                -  ${filter.maxPrice === "" ? "0" : filter.maxPrice}</span></span>
                        </div>
                    </form>
                </div>
            </div>
            <div className="image mt-3">
                <img style={{ width: '210px' }} src="https://klbtheme.com/bacola/wp-content/uploads/2021/05/sidebar-banner.gif" alt="" />
            </div>
        </div>
    )
}