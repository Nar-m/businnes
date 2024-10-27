
import { Link } from 'react-router-dom'

export default function Empty({empty, text}) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '36vw'
        }} className="empty-cart">
            <div className="empty-icons mb-2">
                <div className="image">
                    <img src={empty} alt="" />
                </div>
            </div>
            <div className='empty-cart-text'>
                Your {text} is currently empty.
            </div>
            <Link to={'/'}>  <button className='return-to-shop'>Return to shop</button></Link>
        </div>
    )
}