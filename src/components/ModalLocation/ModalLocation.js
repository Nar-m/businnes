import './modellocation.css';
import Button from '@mui/material/Button'
import { FaXmark } from 'react-icons/fa6';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import { IoIosSearch } from 'react-icons/io';


export default function ModalLocation() {
    const { CloseModal, countrys, showModal, SelectCountry } = useContext(Context);
    const [countrlist, setCountrylist] = useState([]);

    const clickHide = (event) => {
        return event.target.className === 'modal-location active' ? CloseModal() : null
    }
    const Selection = (element) => {
        const { country } = element;
        CloseModal();
        SelectCountry(country);
    }

    useEffect(() => {
        setCountrylist(countrys)
    }, [countrys])


    const searchCountry = (ev) => {
        const value = ev.target.value.toLowerCase();
        if (value !== "") {
            const filterCountry = countrlist.filter((element) => element.country.toLowerCase().includes(value))
            setCountrylist(filterCountry)
        }
        else {
            setCountrylist(countrys)
        }
    }

    const render = () => {
        return countrlist?.map((element, index) => {
            return (
                <Button key={index} onClick={() => Selection(element)} className='country-list-item'>
                    <li className='country-item'>
                        <Button>{element.country}</Button>
                    </li>
                    <li className='country-price'>
                        <Button><span style={{ textTransform: 'capitalize' }}>Min: $160</span></Button>
                    </li>
                </Button>
            )
        })
    }
    return (
        <div onClick={clickHide} className={`${showModal ? 'modal-location active' : 'modal-location'}`}>
            <div className={showModal ? 'modal-content active' : 'modal-content'}>
                <div className='modal-header flex w-full  justify-between'>
                    <div className='modal-text'>
                        <h3>Chosse your Delivery Location</h3>
                        <p>Enter your address and we will specify the offer for your area.</p>
                    </div>
                    <div className='modal-close'>
                        <Button onClick={CloseModal}>
                            <FaXmark />
                        </Button>
                    </div>
                </div>
                <div className='modal-search'>
                    <Button><IoIosSearch /></Button>
                    <input onChange={searchCountry} type='search' placeholder='Search your area...' />
                </div>
                <ul className='country-list'>
                    <Button className='country-list-item'>
                        <li className='country-item'><Button>Select a Location</Button></li>
                        <li className='country-price clear'><Button>Clear All</Button></li>
                    </Button>
                    {render()}
                </ul>
            </div>
        </div>
    )
}