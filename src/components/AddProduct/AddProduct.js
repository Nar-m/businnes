import axios from 'axios';
import './addproduct.css';
import { useState, useRef } from 'react';

export default function AddProduct({ editproduct, MyProduct }) {
    const [element, setElement] = useState({
        width: editproduct.width,
        height: editproduct.height,
        radius: editproduct.radius,
        background: editproduct.background,
        title: editproduct.title,
        description: editproduct.description,
        image: editproduct.image,
        picture: editproduct.picture,
        titleColor: editproduct.titleColor,
        descriptColor: editproduct.descriptColor,
        category: editproduct.category,
        brand: editproduct.brand,
        price: editproduct.price,
        star: editproduct.star,
        country: editproduct.country,
        gender: editproduct.gender,
    })
    const [loading, setloading] = useState(false);
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [uplodProgress, setUploadProgress] = useState(0);

    const upload = useRef();
    const HandleinputChange = (event) => {
        const { name, value } = event.target
        setElement({ ...element, [name]: value });
    }
    const clickUpload = () => upload.current.click();

    const updateProducts = async () => {
        const { _id } = editproduct
        setLoadingEdit(true);
        const respsoeve = await axios.put(`/api/auth/updateProduct/${_id}`, element)
        if (respsoeve.data) {
            setLoadingEdit(false)
            window.location.reload();
            MyProduct();
        }
        else {
            setLoadingEdit(false);
        }
    }

    const AddVariants = () => {
        const formdata = new FormData();
        setloading(true)
        formdata.append('width', element.width);
        formdata.append('height', element.height);
        formdata.append('radius', element.radius)
        formdata.append('background', element.background);
        formdata.append('title', element.title);
        formdata.append('description', element.description);
        formdata.append('image', element.image);
        formdata.append('picture', element.picture);
        formdata.append('titleColor', element.titleColor);
        formdata.append('descriptColor', element.descriptColor);
        formdata.append('category', element.category);
        formdata.append('brand', element.brand);
        formdata.append('price', element.price);
        formdata.append('star', element.star);
        formdata.append('country', element.country);
        formdata.append('gender', element.gender);

        axios.post("/api/auth/addAdminProduct", formdata, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted)
                setUploadProgress(percentCompleted);
            },
        })
            .then((resp) => {
                if (resp.data.succes) {
                    window.location.reload()
                    setloading(false);
                }
                else {
                    setloading(false)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="add-product-conteiner">
            <div className='col'>
                <div className='form-items'>
                    <div className='cart-body'>
                        <div className='mb-4 add-product-conteiner'>
                            <h5 className='mb-3'>Product width</h5>
                            <input value={element.width} onChange={HandleinputChange} type='number' name='width' placeholder='write product width here....' className='form-controls' />
                        </div>
                        <div className='mb-4 add-product-conteiner'>
                            <h5 className='mb-3'>Product height</h5>
                            <input value={element.height} onChange={HandleinputChange} type='number' name='height' placeholder='write product height here....' className='form-controls' />
                        </div>
                        <div className='mb-4 add-product-conteiner'>
                            <h5 className='mb-3'>Product radius</h5>
                            <input value={element.radius} onChange={HandleinputChange} type='number' name='radius' placeholder='write product radius here....' className='form-controls' />
                        </div>
                        <div className='mb-4 add-product-conteiner'>
                            <h5 className='mb-3'>Product background</h5>
                            <input value={element.background} onChange={HandleinputChange} type='color' name='background' placeholder='write product background color....' className='form-controls' />
                        </div>
                        <div className='mb-4 add-product-conteiner'>
                            <h5 className='mb-3'>Product title</h5>
                            <input value={element.title} onChange={HandleinputChange} type='text' name='title' placeholder='write title here....' className='form-controls' />
                        </div>
                        <div className='mb-4'>
                            <h5 className='mb-3'>Product Description</h5>
                            <textarea value={element.description} onChange={HandleinputChange} cols="4" rows="6" type='text' name='description' placeholder='Product Description....' className='form-controls' />
                        </div>
                        <div className='mb-4 add-product-conteiner'>
                            <h5 className='mb-3'>Display Images</h5>
                            <input onChange={HandleinputChange} type='url' name='picture' placeholder='add images url....' className='form-controls' />
                        </div>
                        <div className='mb-4'>
                            <h5 className='mb-3'>Display images</h5>
                            <input ref={upload} onChange={(ev) => setElement({ ...element, image: ev.target.files[0] })} type='file' name='image' id='image' style={{ display: 'none' }} />
                            <div onClick={clickUpload} className='file-upload'>
                                <div className='file-uplaod-dropzon'></div>
                            </div>
                        </div>
                        <div className='mb-4'></div>
                    </div>
                </div>
            </div>
            <div className='col ml-3'>
                <div className='form-items p-1'>
                    <div className='cart-body'>
                        <h5 className='mb-3 p-2'>Organize</h5>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Title Color</h5>
                            <input value={element.titleColor} onChange={HandleinputChange} type='color' name='titleColor' placeholder='select here color....' className='form-controls' />
                        </div>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Description Color</h5>
                            <input value={element.descriptColor} onChange={HandleinputChange} type='color' name='descriptColor' placeholder='select description color....' className='form-controls' />
                        </div>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Product Category</h5>
                            <input value={element.category} onChange={HandleinputChange} type='text' name='category' placeholder='write category here....' className='form-controls' />
                        </div>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Product Brand</h5>
                            <input value={element.brand} onChange={HandleinputChange} type='text' name='brand' placeholder='write brand here....' className='form-controls' />
                        </div>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Product Price</h5>
                            <input value={element.price} onChange={HandleinputChange} type='number' name='price' placeholder='Product Price....' className='form-controls' />
                        </div>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Product Star</h5>
                            <input value={element.star} onChange={HandleinputChange} type='text' name='star' placeholder='Product Star....' className='form-controls' />
                        </div>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Product Country</h5>
                            <input value={element.country} onChange={HandleinputChange} type='text' name='country' placeholder='Product Country....' className='form-controls' />
                        </div>
                        <div className='mb-3'>
                            <h5 className='mb-3'>Product gender</h5>
                            <div style={{ fontFamily: 'poppins, sans-serif' }} className='flex items-center'>
                                <label className='flex items-center' htmlFor='male'>
                                    <span>male</span>
                                    <input value="male" onChange={HandleinputChange} className='ml-2' type='radio' name='gender' id='male' />
                                </label>
                                <label htmlFor='female' className='flex items-center ml-3'>
                                    <span>female</span>
                                    <input value="female" onChange={HandleinputChange} className='ml-2' type='radio' name='gender' id='female' />
                                </label>
                            </div>
                        </div>
                        <div className='mb-2'>
                            <button onClick={AddVariants} style={{
                                background: '#008cff',
                                border: '1px solid #008cff'
                            }} name='button' className='relative form-controls'>
                                Add Variants
                                {loading ? <span className='spinner'></span> : ""}
                            </button>
                            {editproduct ? <button onClick={updateProducts} style={{
                                background: '#ee0979',
                                border: '1px solid #ee0979'
                            }} name='button' className='relative form-controls mt-3'>
                                Edit
                                {loadingEdit ? <span className='spinner'></span> : ""}
                            </button> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}