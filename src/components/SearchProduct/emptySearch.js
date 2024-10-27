import logo from '../images/notresult.png';

export default function EmptySearch({query}) {
    return (
        <div className="empty-search-conteiner">
            <div className="image">
                <img src={logo} alt=''/>
            </div>
            <div className="not-result">Not Result {query}</div>
        </div>
    )
}