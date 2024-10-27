import { useState, useContext } from "react"
import { Context } from "../ContextProvider/ContenxtProvider"

export default function ProgressWidth() {
    const {scrollProgress} = useContext(Context);

    return (
        <div className="progress-width">
            <div style={{width: `${scrollProgress}%`}}></div>
        </div>
    )
}