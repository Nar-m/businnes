export default function SelectedContent(props) {
    const {items, checkClass, ChangeSortProduct, closeSelectitem} = props;
    return (
        <li onClick={() => {
            ChangeSortProduct(items)
            closeSelectitem()
        }} className={checkClass}>{items}</li>
    )
}