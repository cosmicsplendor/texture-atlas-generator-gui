import { useContext, useEffect, useRef } from "react"

import AppContext from "../../AppContext"
import styles from "../style.css"
import texAtlas from "../../utils/texAtlas"
import { PREVIEW_ID } from "../../constants"


export default () => {
    const { settings, imports } = useContext(AppContext)
    const previewContainerRef = useRef()
    
    useEffect(() => {
        const previewContainer = previewContainerRef.current
        const previewImage = previewContainer.querySelector(`#${PREVIEW_ID}`)
        const { width, height } = previewContainer.getBoundingClientRect()
        previewImage.width = width
        previewImage.height = height
    }, [])

    useEffect(() => {
        texAtlas
            .applySettings(settings)
            .render(imports)
    }, [ settings.sortingFn, settings.rotationEnabled, settings.margin, imports.length ])

    return (
       <div className={styles.preview} ref={previewContainerRef}>
            <img style={{ display: !!imports.length ? "block": "none"}} className={styles.previewImg} id={PREVIEW_ID} />
       </div>
    )
}