import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { setAuthToken } from "../AuthToken/setAuthToken";


export default function Login() {
    const [login, setLogin] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)
    const [emailError, setemailerror] = useState('');
    const [type, setType] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const navigate = useNavigate()

    const HandleInputChange = (event) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    }
    const changePasswordType = () => setType(!type);

    const userLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const resposeve = await axios.post('/api/auth/login', login)
            if (resposeve.data.succes) {
                setLoading(false);
                if (!loading) {
                    setemailerror("");
                    setPasswordMessage("");
                    setAuthToken(resposeve.data.token)
                    navigate("/succes")
                    window.location.reload()
                }
            }
            else {
                setLoading(false);
                if (!loading) {
                    setemailerror(resposeve.data.emailMessage);
                    setPasswordMessage(resposeve.data.passwordMessage);
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        axios.get("/api/auth/authmiddleware")
            .then((resp) => {
                if (resp.data.token) {
                    navigate("/")
                }
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <section className=" gradient-form" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: '185px' }} alt="logo" />
                                            <h4 className="title-contact mt-1 mb-5 pb-1">We are The Login Team</h4>
                                        </div>
                                        <form className="flex flex-col" onSubmit={userLogin}>
                                            <p className="label-text">Please login to your account</p>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={HandleInputChange} name="email" type="email" id="form2Example11" className="form-control"
                                                    placeholder=" email address" />
                                                <span className="error">{emailError}</span>
                                            </div>
                                            <p className="label-text">Pleaze Password</p>
                                            <div data-mdb-input-init className="form-outline relative mb-4">
                                                <i onClick={changePasswordType} style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '30%',

                                                }} className={`fa-regular ${type ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                                <input onChange={HandleInputChange} name="password" placeholder="password" type={
                                                    type ? 'text' : 'password'
                                                } id="form2Example22" class="form-control" />
                                                <span className="error">{passwordMessage}</span>
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button style={{ paddingBottom: '0.5rem', paddingTop: '0.625rem', border: 'none' }} className="btn btn-primary relative btn-block fa-lg gradient-custom-2 mb-3 w-full p-3" type="submit">Log
                                                    in
                                                    {loading ? <div className="spinner"></div> : ''}
                                                </button>
                                                <Link to={'/forgotpassword'} className="text-muted" href="#!">Forgot password?</Link>
                                            </div>
                                            <div clasclassNames="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-2 me-2 text-center">Don't have an account?</p>
                                                <Link to={'/register'}><button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger w-full">Create new</button></Link>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}