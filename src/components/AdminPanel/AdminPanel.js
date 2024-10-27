import './admin.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AdminSide from '../AdminSide/AdminSide'
import AdminHeader from '../AdminHeader/AdminHeader'
import Dashboard from '../AdminDashboard/AdminDashboard'
import AddProduct from '../AddProduct/AddProduct'
import Products from '../MyProduct/MyProduct'
import EditProfile from '../UserProfile/UserProfile'
import AdminCart from '../AdminCart/AdminCart'

export default function Admin() {
    const navigate = useNavigate()
    const [togglesidebar, setToggleSidebar] = useState(true);
    const [showCartSydbar, setShowCartSydbar] = useState(false);
    const [dashboard, setDashbord] = useState(true);
    const [userProfile, setUserProfile] = useState(false);
    const [myProduct, setMyProduct] = useState(false);
    const [cart, setCart] = useState([]);
    const [editproduct, setEditproduct] = useState({
        width: "",
        height: "",
        radius: "",
        background: "",
        title: "",
        description: "",
        image: "",
        picture: "",
        titleColor: "",
        descriptColor: "",
        category: "",
        brand: "",
        price: "",
        star: "",
        country: "",
        gender: "",
    })
    const [addProduct, setAddProduct] = useState(false)
    const [navbaractive, setnavbaractice] = useState(false)

    const HandleScroll = (e) => {
        if (Math.ceil(e.timeStamp) > 318988) {
            setnavbaractice(true)
        }
        else {
            setnavbaractice(false)
        }
    }
    const openShowCartSydbar = () => setShowCartSydbar(true);
    const closeHideCartSydbar = () => setShowCartSydbar(false);

    const MyDashboardPage = () => {
        setDashbord(true)
        setAddProduct(false)
        setUserProfile(false);
        setMyProduct(false)
    };
    const MyProduct = () => {
        setMyProduct(true)
        setAddProduct(false);
        setUserProfile(false);
        setDashbord(false);
    }
    const MyAddProdcut = () => {
        setAddProduct(true)
        setUserProfile(false);
        setMyProduct(false)
        setDashbord(false)
    }

    const UserProfile = () => {
        setUserProfile(true);
        setDashbord(false);
        setMyProduct(false)
        setAddProduct(false)
    }

    useEffect(() => {
        axios.get("/api/auth/authmiddleware")
            .then((resp) => {
                if (!resp.data.token) {
                    navigate("/login")
                }
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <section onScroll={HandleScroll} className='admin'>
            <AdminSide
                MyDashboardPage={MyDashboardPage}
                UserProfile={UserProfile}
                MyAddProdcut={MyAddProdcut}
                MyProduct={MyProduct}
                setToggleSidebar={setToggleSidebar}
                closeSidebar={() => setToggleSidebar(false)}
                togglesidebar={togglesidebar} />
            <AdminHeader
                MyDashboardPage={MyDashboardPage}
                userProfile={UserProfile}
                navbaractive={navbaractive}
                cart={cart}
                openShowCartSydbar={openShowCartSydbar}
                togglesidebar={() => setToggleSidebar(!togglesidebar)}
            />
            <AdminCart
                cart={cart}
                setCart={setCart}
                closeHideCartSydbar={closeHideCartSydbar}
                showCartSydbar={showCartSydbar} />
            <main id='main'>
                {dashboard ? <Dashboard /> : addProduct ? <AddProduct
                    MyProduct={MyProduct}
                    editproduct={editproduct} /> : myProduct ? <Products
                        MyAddProdcut={MyAddProdcut}
                        MyProduct={MyProduct}
                        setEditproduct={setEditproduct} /> : userProfile ? <EditProfile /> : ''}
            </main>
        </section>
    )
}