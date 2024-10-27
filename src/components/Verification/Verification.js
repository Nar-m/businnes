import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function Verification() {
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState("")
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const sendVerificationCode = async (ev) => {
        ev.preventDefault();
        setLoading(true)
        const responseve = await axios.post("/api/auth/verificationCode", { code: code })
        if (responseve.data.succes) {
            navigate("/updatePassword")
            setMessage("")
            setLoading(false);
        }
        else {
            setLoading(false);
            setMessage(responseve.data.message)
        }
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
                                            <h4 className="title-contact mt-1 mb-5 pb-1">Verification Code</h4>
                                        </div>
                                        <form onSubmit={sendVerificationCode} className="flex flex-col">
                                            <p className="label-text">Enter OTP</p>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <input onChange={(ev) => setCode(ev.target.value)} name="code" type="text" id="form2Example11" className="form-control"
                                                    placeholder="Enter OTP" />
                                                <span className="error">{message}</span>
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button style={{ paddingBottom: '0.5rem', paddingTop: '0.625rem', border: 'none' }} className="btn btn-primary relative btn-block fa-lg gradient-custom-2 mb-3 w-full p-3" type="submit">
                                                    Send Code
                                                    {loading ? <div className="spinner"></div> : ''}
                                                </button>
                                                <Link to={'/forgotpassword'} className="text-muted" href="#!">Forgot password?</Link>
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