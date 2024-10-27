import { createContext, useState, useEffect, useRef } from "react";
import axios from 'axios';
import { setAuthToken } from "../AuthToken/setAuthToken";
export const Context = createContext();
const country = localStorage.getItem('country') || 'India';

function ContextProvider({ children }) {
    const [openModal, setOpenmodal] = useState({ open: false, element: "" });
    const [showModal, setShowModal] = useState(false);
    const [modalWishlist, setModalWishlist] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0)
    const [element, setElement] = useState('');
    const [selection, setSelection] = useState(country);
    const [quantity, setQuantity] = useState(1);

    const [product, setProduct] = useState([]);
    const [showCategory, setShowCategory] = useState(false);
    const [user, setUsers] = useState({
        username: "",
        surname: "",
        email: "",
        picture: ""
    })
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [countrys, setCountry] = useState([]);
    const ShowModal = () => setShowModal(true);
    const CloseModal = () => setShowModal(false);
    const productRef = useRef();

    const openModalWishlist = (item) => {
        setModalWishlist(true);
        setElement(item);
    }
    const closeWishlistModal = () => {
        setModalWishlist(false);
        setElement("");
    }
    const ShowModalProduct = (item) => {
        setOpenmodal({ open: true, element: item });
    }
    const closeModalProduct = () => {
        setOpenmodal({ open: false, element: "" });
    }
    const SelectCountry = (name) => {
        setSelection(name);
        localStorage.setItem('country', name);
    };

    const showcategory = () => setShowCategory(!showCategory);

    const getCountry = async () => {
        const { data } = await axios.get("https://countriesnow.space/api/v0.1/countries/");
        setCountry(data.data)
    }


    useEffect(() => {
        getCountry()
    }, [])

    useEffect(() => {
        axios.get('/api/auth/getCart')
            .then((resposeve) => {
                setCart(resposeve.data)
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        axios.get("/api/auth/getCaruselFood")
            .then((resp) => {
                setProduct(resp.data)
            })
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log("login")
        }
        else {
            axios.get("/api/auth/getWishlist")
                .then((resp) => {
                    setWishlist(resp.data)
                })
                .catch((err) => console.log(err))
        }

    }, [])

    useEffect(() => {
        axios.get("/api/auth/authmiddleware")
            .then((resp) => {
                if (resp.data.token) {
                    setUsers(() => ({
                        id: resp.data.user._id,
                        username: resp.data.user.username,
                        surname: resp.data.user.surname,
                        email: resp.data.user.email,
                        picture: resp.data.user.picture,
                        image: resp.data.user.image
                    }))
                    setAuthToken(resp.data.token)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    const HandleScroll = () => {
        let scrolltop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let preogress = scrolltop / (scrollHeight - document.documentElement.clientHeight) * 100
        setScrollProgress(preogress);
    }

    useEffect(() => {
        window.addEventListener("scroll", HandleScroll)
    }, [])

    return (
        <Context.Provider value={{
            SelectCountry,
            user,
            ShowModalProduct,
            closeModalProduct,
            openModal,
            cart,
            productRef,
            scrollProgress,
            setQuantity,
            quantity,
            element,
            product,
            modalWishlist,
            wishlist,
            setModalWishlist,
            showcategory,
            closeWishlistModal,
            openModalWishlist,
            countrys,
            showCategory,
            ShowModal,
            selection,
            CloseModal,
            showModal
        }}>{children}</Context.Provider>
    )
}

export default ContextProvider;