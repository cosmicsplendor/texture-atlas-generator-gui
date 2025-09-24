import { useContext, useEffect, useRef, useMemo, useState } from "react"

import AppContext from "../../AppContext"
import styles from "../style.css"
import texAtlas from "../../utils/texAtlas"
import { PREVIEW_ID } from "../../constants"


export default () => {
    const { settings, imports } = useContext(AppContext)
    const previewContainerRef = useRef()
    const [ finalArea, setFinalArea ] = useState(0)
    useEffect(() => {
        texAtlas
            .applySettings(settings)
            .render(imports)
            .then(bound => {
                setFinalArea(bound.width * bound.height)
             })
    }, [settings.algorithm, settings.rotationEnabled, settings.margin, imports.length])
    const minArea = useMemo(() => {
        return imports.reduce((area, x) => area + (x.width * x.height), 0)
    }, [imports])
    const efficiency = useMemo(() => {
        if (finalArea === 0) return 0
        return (minArea / finalArea * 100).toFixed(2)
    }, [minArea, finalArea])
    console.log(efficiency)
    return (
        <div className={styles.preview} ref={previewContainerRef}>
            <img className={styles.previewImg} id={PREVIEW_ID} />
        </div>
    )
}