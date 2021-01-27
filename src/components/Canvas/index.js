import { useContext, useEffect, useRef } from "react"

import AppContext from "../../AppContext"
import styles from "../style.css"
import cnvRendererFactory from "../../utils/cnvRenderer"

const CNV_ID = "arena"
let cnvRenderer

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
        if (typeof cnvRenderer === "undefined") {
            console.log("Initializing canvas")
            cnvRenderer = cnvRendererFactory(CNV_ID)
        }
        cnvRenderer.applySettings(settings)
        cnvRenderer.render(imports)
    }, [ settings.sortingFn, settings.rotationEnabled, settings.margin, imports ])

    return (
        <canvas ref={cnvRef} className={styles.canvas} id={CNV_ID} />
    )
}