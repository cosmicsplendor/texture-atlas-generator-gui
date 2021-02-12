import { useContext, useEffect, useRef } from "react"

import AppContext from "../../AppContext"
import styles from "../style.css"
import texAtlas from "../../utils/texAtlas"
import { CNV_ID } from "../../constants"


export default () => {
    const { settings, imports } = useContext(AppContext)
    const cnvRef = useRef()
    
    useEffect(() => {
        const canvas = cnvRef.current
        const { width, height } = cnvRef.current.getBoundingClientRect()
        canvas.width = width
        canvas.height = height
    }, [])

    useEffect(() => {
        if (!texAtlas.renderer) {
            console.log("Initializing canvas")
            texAtlas.init(CNV_ID)
        }
        texAtlas
            .applySettings(settings)
            .render(imports)
    }, [ settings.sortingFn, settings.rotationEnabled, settings.margin, imports ])

    return (
        <canvas ref={cnvRef} className={styles.canvas} id={CNV_ID} />
    )
}