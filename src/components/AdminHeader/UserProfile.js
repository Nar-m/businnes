import { useContext } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"
import { FaUser, FaCloudArrowDown } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../AuthToken/setAuthToken";

export default function UserProfile({ showProfile, close, userProfile, MyDashboardPage }) {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const Logout = (event) => {
        event.preventDefault();
        axios.get("/api/auth/logout")
            .then((resp) => {
                navigate("/login")
                setAuthToken(null)
                close()
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className={`${showProfile ? 'user-profile show' : 'user-profile'}`}>
            <div className="profile-header w-full p-3 flex  mt-2 justify-center items-center flex-col text-center">
                <div className="image">
                    <img style={{ borderRadius: '50%' }} alt="" src={user.picture ? user.picture :
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NPqtDfIjmzuP78QKYAk462-H_lIMRxJEIG_7exYvg_UV4dbImm-0&usqp=CAE&s"
                    } />
                </div>
                <div className="user-name">
                    <h5>Hallo, {user.username}</h5>
                </div>
            </div>
            <hr></hr>
            <ul className="user-profile-list">
                <li onClick={userProfile}>
                    <span className="profile-user-icons"><FaUser /></span>
                    <span className="name">Profile</span>
                </li>
                <li>
                    <span className="profile-user-icons"><i className="fa-solid fa-gear"></i></span>
                    <span className="name">Setting</span>
                </li>
                <li onClick={MyDashboardPage}>
                    <span className="profile-user-icons"><i className="fa-solid fa-table-columns"></i></span>
                    <span className="name">Dashboard</span>
                </li>
                <li>
                    <span className="profile-user-icons"><i className="fa-solid fa-chalkboard"></i></span>
                    <span className="name">Earning</span>
                </li>
                <li>
                    <span className="profile-user-icons"><FaCloudArrowDown /></span>
                    <span className="name">Downloads</span>
                </li>
                <hr></hr>
                <li onClick={Logout}>
                    <span className="profile-user-icons"><i className="fa-solid fa-right-from-bracket"></i></span>
                    <span className="name">Logout</span>
                </li>
            </ul>
        </div>
    )
}