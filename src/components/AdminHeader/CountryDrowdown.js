

export default function CountrDrowDown(props) {
    const { showCountryDrowdown, setActiveIndex, activeIndex, country, close, } = props;

    const HandleSelected = (index) => {
        setActiveIndex(index)
        close()
        localStorage.setItem('countryselected', index)
    }
    return (
        <ul className={`${showCountryDrowdown ? 'countrys show' : 'countrys'}`}>
            {country?.map((item, index) => {
                return (
                    <li className={`${activeIndex === index ? 'active' : ''}`} onClick={() => HandleSelected(index)} key={index}>
                        <span className="country-list-items flex items-center">
                            <img style={{ width: '22px', height: '22px', borderRadius: '50%' }} src={item.src} alt="" />
                            <span className="name">{item.name}</span>
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}