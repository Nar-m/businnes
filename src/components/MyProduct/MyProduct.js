import './product.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Products({ setEditproduct, MyAddProdcut, MyProduct }) {
    const [adminProduct, setAdminProduct] = useState([]);

    const fetchProduct = async () => {
        const respsoeve = await axios.get("/api/auth/getAdminProduct");
        setAdminProduct(respsoeve.data);
    }
    const addToCart = async (element) => {
        try {
            const resposeve = await axios.post("/api/auth/addToCartAdmin", element);
            if (resposeve.data.succes) {
                window.location.reload();
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const FindEditProduct = async (id) => {
        const response = await axios.get(`/api/auth/editProduct/${id}`)
        if (response) {
            setEditproduct(response.data);
            MyAddProdcut()
        }
    }

    const removeItem = async (id) => {
        const respsoeve = await axios.delete("/api/auth/removeAdminProduct/" + id)
        if (respsoeve.data) {
            MyProduct()
            window.location.reload();
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="my-Product p-3 w-full flex flex-col">
            <div className='flex w-full items-center justify-between'>
                <div className='admin-search-bar relative'>
                    <span className='search-icons'><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input type='text' placeholder='Search Product' id='admin-search-control' />
                </div>
            </div>
            <div className='admin-product mt-4'>
                {adminProduct.length === 0 ? <div className='flex items-center justify-center'>
                    <div className='image'>
                        <img src='https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-illustration-download-in-svg-png-gif-file-formats--no-records-list-record-emply-data-user-interface-pack-design-development-illustrations-6430770.png?f=webp' alt='' />
                    </div>
                </div> : <div className='admin-product-body p-3 flex flex-wrap items-center'>
                    {adminProduct?.map((element, index) => {
                        return (
                            <div key={index} style={{
                                border: `1px solid ${element.background}`,
                                width: `${element.width}px`,
                                height: `${element.height}px`,
                                background: `${element.background}`,
                                borderRadius: `${element.radius}px`,

                            }} className='wrapper relative p-3'>
                                <div className="product-btns">

                                    <button onClick={() => FindEditProduct(element._id)} className="btns"><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button onClick={() => removeItem(element._id)} className="btns"><i className="fa-solid fa-trash-can"></i></button>
                                </div>
                                <div style={{ width: '100%', height: '180px' }} className='image mb-3'>
                                    <img src={element.image ? require(`../files/${element.image}`) : element?.picture} alt='' />
                                </div>
                                <div style={{ color: `${element.titleColor}` }} className='title'>
                                    <span>{element.title}</span>
                                </div>
                                <div className='product-description mt-2'>
                                    <span style={{ color: `${element.descriptColor}` }}>{element.description.length > 100 ? element.description.substring(0, 50) : element.description}</span>
                                </div>
                                <div className='price mt-2'>
                                    <span>{element.price} $</span>
                                </div>
                                <div className='product-brand mt-2'>
                                    <span>{element.brand}</span>
                                </div>
                                <div onClick={() => addToCart(element)} className='btns mt-2 w-full'>
                                    <button>Add to Carts</button>
                                </div>
                            </div>
                        )
                    })}
                </div>}
            </div>
        </div>
    )
}