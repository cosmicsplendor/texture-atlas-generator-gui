import { useContext, useEffect, useRef } from "react"

import AppContext from "../../AppContext"
import styles from "../style.css"
import texAtlas from "../../utils/texAtlas"
import { PREVIEW_ID } from "../../constants"


export default () => {
    const { settings, imports } = useContext(AppContext)
    const previewContainerRef = useRef()

    useEffect(() => {
        texAtlas
            .applySettings(settings)
            .render(imports)
    }, [settings.algorithm, settings.rotationEnabled, settings.margin, imports.length])

    return (
        <div className={styles.preview} ref={previewContainerRef}>
            <img className={styles.previewImg} id={PREVIEW_ID} />
        </div>
    )
}