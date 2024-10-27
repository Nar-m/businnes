import './dashboard.css';
import { useContext } from 'react';
import { Context } from '../ContextProvider/ContenxtProvider';

export default function Dashboard() {
    const { user } = useContext(Context);

    return (
        <div className="row p-3">
            <div className='dashboard-content'>
                <div className='dashboard-cart'>
                    <div className='cart-body flex'>
                        <div className='row'>
                            <div className='col'>
                                <div className='flex items-center gap-3 mb-5'>
                                    <div className='image'>
                                        <img src={user.picture ? user.picture
                                            : user.image ? require(`../files/${user.image}`) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NPqtDfIjmzuP78QKYAk462-H_lIMRxJEIG_7exYvg_UV4dbImm-0&usqp=CAE&s"
                                        } alt='' />
                                    </div>
                                    <div className='text'>
                                        <p className='semibold'>Welcome back</p>
                                        <h4 className='semibold'>{user.username} {user.surname}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div>
                                    <h4 className='mb-1 semibold items-content' style={{ fontSize: '1.5rem' }}>$65.4K</h4>
                                    <p className='mt-1 semibold'>Today's Sales</p>
                                    <div className='cart-progress mt-2'>
                                        <div className='progress-bar'></div>
                                    </div>
                                </div>
                                <div className='vr'></div>
                                <div>
                                    <h4 className='mb-1 semibold items-content' style={{ fontSize: '1.5rem' }}>$78.4%</h4>
                                    <p className='mt-1 semibold'>Growth Rate</p>
                                    <div className='cart-progress mt-2'>
                                        <div className='progress-bar gradient'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='cart-logo items-center'>
                            <div className='logo' style={{ width: '300px', height: '180px' }}>
                                <img src='https://codervent.com/maxton/demo/vertical-menu/assets/images/gallery/welcome-back-3.png' alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}