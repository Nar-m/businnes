import './userprofile.css';
import { useContext, useState, useRef } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';
import axios from 'axios';
import { FaPen } from 'react-icons/fa6';

export default function EditProfile() {
    const { user } = useContext(Context)
    const { id } = user

    const [updateProfile, setUpdateprofile] = useState({
        username: user.username,
        surname: user.surname,
        email: user.email,
        date: user.data,
        picture: user.picture,
        image: user.image,
    })
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdateprofile({ ...updateProfile, [name]: value });
    }
    const fileupload = useRef();
    const openWindowFiles = () => fileupload.current.click();

    const editProfile = (ev) => {
        ev.preventDefault();
        setLoading(true);
        axios.put(`/api/auth/editProfile/${id}`, updateProfile, {
            onUploadProgress: (ProgressEvent) => {
                const percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total);
                setUploadProgress(percentCompleted);
            }
        })
            .then((resp) => {
                if (resp.data) {
                    window.location.reload()
                    setLoading(false);
                }
                else {
                    setLoading(false);
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className="edit-profile p-3">
            <div className="cart flex flex-col">
                <div className='image mb-3'>
                    <img src={`${user.picture ? user.picture :
                        user.image ? require(`../files/${user.image}`) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NPqtDfIjmzuP78QKYAk462-H_lIMRxJEIG_7exYvg_UV4dbImm-0&usqp=CAE&s'
                        }`} alt='' />
                </div>
                <div className='data-username'>
                    <h5 className='mb-3'>{user.username} {user.surname}</h5>
                    <p>{user?.data}</p>
                </div>
            </div>
            <div style={{ width: '700px' }} className='mt-3 p-3 w-full edit-content'>
                <div className='form-title'>
                    <h5>Edit Profile</h5>
                </div>
                <form onSubmit={editProfile}>
                    <div className='mb-4 add-product-conteiner'>
                        <h5 className='mb-3'>Username</h5>
                        <input value={updateProfile.username} onChange={HandleInputChange} type='text' name='username' placeholder='username' className='form-controls' />
                    </div>
                    <div className='mb-4 add-product-conteiner'>
                        <h5 className='mb-3'>Surname</h5>
                        <input value={updateProfile.surname} onChange={HandleInputChange} type='text' name='surname' placeholder='surname' className='form-controls' />
                    </div>
                    <div className='mb-4 add-product-conteiner'>
                        <h5 className='mb-3'>Email</h5>
                        <input value={updateProfile.email} onChange={HandleInputChange} type='email' name='email' placeholder='email' className='form-controls' />
                    </div>
                    <div className='mb-4 add-product-conteiner'>
                        <h5 className='mb-3'>Date </h5>
                        <input value={updateProfile.date} onChange={HandleInputChange} type='text' name='date' placeholder='MM/DD/YYYY' className='form-controls' />
                    </div>
                    <div className='mb-4 add-product-conteiner'>
                        <h5 className='mb-3'>User image add Url</h5>
                        <input value={user.picture} onChange={HandleInputChange} type='url' placeholder='add img url...' name='picture' className='form-controls' />
                    </div>
                    <div className='image mb-3'>
                        <h5 className='mb-3'>User image Upload</h5>
                        <div onClick={openWindowFiles} className='image' style={{ position: 'relative' }}>
                            <span className='pen-icons'>
                                <FaPen />
                            </span>
                            <img src={`${user.picture ? user.picture :
                                user.image ? require(`../files/${user.image}`) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NPqtDfIjmzuP78QKYAk462-H_lIMRxJEIG_7exYvg_UV4dbImm-0&usqp=CAE&s'
                                }`} alt='' />
                        </div>
                        <input ref={fileupload} style={{ display: 'none' }} onChange={(ev) => {
                            setUpdateprofile({ ...updateProfile, image: ev.target.files[0] })

                        }} type='file' placeholder='add img url...' name='image' className='form-controls' />
                    </div>
                    <div className='mb-4  add-product-conteiner relative'>
                        <input style={{ background: '#008cff' }} className='form-controls' type='submit' name='submit' value="Edit" />
                        {loading ? <span className='spinner' style={{ right: '12px' }}></span> : ""}
                    </div>
                </form>
            </div>
        </div>
    )
}