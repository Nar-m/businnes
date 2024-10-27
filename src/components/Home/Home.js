
import './home.css';
import Aside from "../Aside/Aside";
import Main from "../main/Main";


export default function Home() {
    return (
        <>
            <section className="section1">
                <div className="conteiner">
                    <Aside />
                    <Main />
                </div>
            </section>
        </>
    )
}