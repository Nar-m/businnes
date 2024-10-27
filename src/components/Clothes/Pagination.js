import { Context } from "../ContextProvider/ContenxtProvider";
import { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function Pagination({ totalPages, handlePageChange, curentPages, prevPages, nextPages }) {
    const pagination = [];
    const { productRef } = useContext(Context);

    for (let i = 1; i <= totalPages; i++) {
        pagination.push(i)
    }
    return (
        <ul className="flex items-center justify-center p-2">
            <button onClick={() => {
                window.scrollTo({ top: productRef.current.offsetTop, behavior: 'instant' })
                prevPages()
            }} disabled={curentPages === 1} className={`pages-btns ${curentPages === 1 ? 'pages-left disabled' : 'pages-left'}`}><FaChevronLeft /></button>
            {pagination?.map((item, index) => {
                return (
                    <li onClick={() => {
                        window.scrollTo({ top: productRef.current.offsetTop, behavior: 'instant' })
                        handlePageChange(item)
                    }} className={`${curentPages === item ? 'page-number active' : 'page-number'}`} key={index}>{item}</li>
                )
            })}
            <button onClick={() => {
                nextPages()
                window.scrollTo({ top: productRef.current.offsetTop, behavior: 'instant' })
            }} disabled={curentPages === totalPages} className={`pages-btns ${curentPages === totalPages ? 'pages-right disabled ' : 'pages-right'}`}><FaChevronRight /></button>
        </ul>
    )
}