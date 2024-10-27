import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios";

export default function UpdatePassword() {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState([]);
    const [type, setType] = useState(false);

    const changePasswordType = () => setType(!type);

    const navigate = useNavigate();

    const updatePassword = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        const respsoeve = await axios.post("/api/auth/updatePassword", { password: password });
        if (respsoeve.data.succes) {
            setMessage([]);
            navigate("/login");
            setLoading(false)
        }
        else {
            setMessage(respsoeve.data.error);
            setLoading(false)
        }
    }

    const showErrorMessage = () => {
        return message.filter((el) => el.path === 'password').map((el) => el.msg)
    }

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
                                            <h4 className="title-contact mt-1 mb-5 pb-1">Update Password</h4>
                                        </div>
                                        <form onSubmit={updatePassword} className="flex flex-col">
                                            <p className="label-text">Enter new Password</p>
                                            <div data-mdb-input-init className="form-outline relative mb-4">
                                            <i onClick={changePasswordType} style={{
                                                    cursor: 'pointer',
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '30%',

                                                }} className={`fa-regular ${type ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                                <input onChange={(ev) => setPassword(ev.target.value)} name="password" type={type ? 'text' : 'password'} id="form2Example11" className="form-control"
                                                    placeholder="Enter new password" />
                                                <span className="error">{showErrorMessage()}</span>
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button style={{ paddingBottom: '0.5rem', paddingTop: '0.625rem', border: 'none' }} className="btn btn-primary relative btn-block fa-lg gradient-custom-2 mb-3 w-full p-3" type="submit">
                                                    Update Password
                                                    {loading ? <div className="spinner"></div> : ''}
                                                </button>
                                                <Link to={'/login'} className="text-muted" href="#!">Login</Link>
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