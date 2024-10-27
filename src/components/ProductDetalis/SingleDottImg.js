export default function SingleDottImg({item, onclick, checkClass}) {
    return (
        <div onClick={onclick} className={`${checkClass ? 'single-dott-img active' : 'single-dott-img'}`}>
            <img src={item.path} alt=""/>
        </div>
    )
}