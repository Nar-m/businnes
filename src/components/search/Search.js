import Button from '@mui/material/Button'
import { IoSearch } from 'react-icons/io5'
import SearchProduct from '../SearchProduct/SearchProduct'
import { useState } from 'react'
import axios from 'axios'

export default function Search() {
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState([]);

    const closeSeachConteiner = () => setQuery("");

    const searchProduct = async (event) => {
        setQuery(event.target.value);       
        try {
            const resposeve = await axios.get(`/api/auth/search?query=${query}`)
            if(resposeve.data) {
                setSearch(resposeve.data);
            }
        }
        catch(err){
            console.log(err)
        }
    } 
    return (
        <div className="search relative">
            <form>
                <input onChange={searchProduct} type="search" name='search' placeholder='Search for products...' />
                <Button className='searchbtns'>
                    <IoSearch />
                </Button>
            </form>
            {query.trim().length > 0 ? <SearchProduct 
            closeSeachConteiner={closeSeachConteiner}
            query={query}
            search={search}/> : ""}
        </div>
    )
}