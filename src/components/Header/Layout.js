import './layout.css'
import logo from '../images/logo.png';
import Header from './Header';
//data-aos="fade-up" data-aos-delay="200"//;

export default function Layout() {
    return (
        <>
            <div className='app-header'>
                <p className='mb-0 mt-0 text-center'>Due To the COVID 19 epidemic, orders may be processed with a slight delay</p>
            </div>
            <Header logo={logo} />
        </>
    )
}