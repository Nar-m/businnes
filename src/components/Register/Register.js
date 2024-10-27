import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";
import github from '../images/github-logo.png';

export default function Register() {
    const [register, setRegister] = useState({
        username: "",
        surname: "",
        date: "",
        email: "",
        password: "",
        priviCode: ""
    })
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(false);
    const changePasswordType = () => setType(!type);

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [err, setmessages] = useState('');
    const [code, setCode] = useState("")
    const SignUpGoogleUsing = () => {
        window.open('http://localhost:5000/api/auth/google/callback', "_self");
    }
    const SignUpGithubStrategy = () => {
        window.open('http://localhost:5000/api/auth/github/callback', "_self");
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRegister({ ...register, [name]: value })
    }
    const userDataSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const responseve = await axios.post('/api/auth/register', register)
            if (responseve.data.succes) {
                navigate("/login")
                setErrors([])
                setLoading(false);
            }
            else {
                setLoading(false);
                if (!loading) {
                    if (responseve.data.err) {
                        setmessages(responseve.data.err)
                        console.log(responseve.data.err)
                    }
                    if (responseve.data.coderror) {
                        setCode(responseve.data.coderror);
                    }
                    setErrors(responseve.data.message)
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
    console.log(errors)
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
                                            <h4 className="title-contact  mt-1 mb-5 pb-1">Sign Up</h4>
                                        </div>
                                        <form onSubmit={userDataSubmit} className="flex flex-col">
                                            <p className="label-text">Enter your username</p>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={handleInputChange} name="username" type="text" id="form2Example11" className="form-control"
                                                    placeholder="Enter your username" />
                                                <span className="error">{!errors ? "" : errors?.filter((el) => el.path === 'username').map((item) => item.msg)}</span>
                                            </div>
                                            <p className="label-text">Enter your surname</p>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={handleInputChange} name="surname" placeholder="Enter your surname" type="text" id="form2Example22" class="form-control" />
                                                <span className="error">{!errors ? "" : errors?.filter((el) => el.path === 'surname').map((item) => item.msg)}</span>
                                            </div>
                                            <p className="label-text">MM/DD/YYYY:</p>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={handleInputChange} name="date" placeholder="MM/DD/YYYY" type="text" id="form2Example22" class="form-control" />
                                                <span className="error">{!errors ? "" : errors?.filter((el) => el.path === 'date').map((item) => item.msg)}</span>
                                            </div>
                                            <p className="label-text">Enter your email address</p>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={handleInputChange} name="email" placeholder="Enter your email address" type="email" id="form2Example22" class="form-control" />
                                                <span className="error">{!errors ? "" : errors?.filter((el) => el.path === 'email').map((item) => item.msg)}</span>
                                                <span className="error">{err}</span>
                                            </div>
                                            <p className="label-text">Enter your password</p>
                                            <div data-mdb-input-init className="form-outline relative mb-4">
                                                <i onClick={changePasswordType} style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '30%',

                                                }} className={`fa-regular ${type ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                                <input onChange={handleInputChange} name="password" placeholder="Enter your password" type={
                                                    type ? 'text' : 'password'
                                                } id="form2Example22" class="form-control" />
                                                <span className="error">{!errors ? "" : errors?.filter((el) => el.path === 'password').map((item) => item.msg)}</span>
                                            </div>
                                            <p className="label-text">Enter your priviCode</p>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={handleInputChange} name="priviCode" placeholder="Enter your priviCode" type="text" id="form2Example22" class="form-control" />
                                                <span className="error">{!errors ? "" : errors?.filter((el) => el.path === 'priviCode').map((item) => item.msg)}</span>
                                                <span className="error">{code}</span>
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button style={{ paddingBottom: '0.5rem', paddingTop: '0.625rem', border: 'none' }} className="btn btn-primary btn-block relative fa-lg gradient-custom-2 mb-3 w-full p-3" type="submit">Register
                                                    {loading ? <div className="spinner"></div> : ""}
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                <button onClick={SignUpGoogleUsing} style={{ paddingBottom: '0.5rem', paddingTop: '0.625rem', }} className="flex items-center justify-center btn btn-primary btn-block fa-lg google mb-3 w-full p-3" type="button">
                                                    <img className="mr-2" style={{ width: '23px', height: '100%' }} src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_sq_sl.svg?hl=ru" alt="" />Google Accounts: Sign in
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                <button onClick={SignUpGithubStrategy} style={{ paddingBottom: '0.5rem', paddingTop: '0.625rem', }} className="flex items-center justify-center btn btn-primary btn-block fa-lg facebook mb-3 w-full p-3" type="button">
                                                    <img className="mr-2" style={{ width: '23px', height: '100%' }} src={github} alt="" />Github Accounts: Sign in
                                                </button>
                                            </div>
                                            <div clasclassNames="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-2 me-2 text-center">Don't have an account?</p>
                                                <Link to={'/login'}>  <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-danger w-full">Login</button></Link>
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