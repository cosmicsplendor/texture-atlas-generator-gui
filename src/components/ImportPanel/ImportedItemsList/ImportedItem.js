import { useContext, useCallback } from "react"

import AppContext from "../../../AppContext"
import styles from "../style.css"

export default ({ src, id }) => {
    const { importAxns, activeSprite, setActiveSprite } = useContext(AppContext)
    const removeImportedItem = useCallback((e) => {
        e.stopPropagation()
        setActiveSprite("")
        importAxns.remove({ id })
    }, [])
    const imgStyle = activeSprite === id ? styles.activeImportedImg: styles.importedImg
    return (
        <div className={styles.importedItem} onClick={() => setActiveSprite(id)}>
            <img src={src} className={imgStyle}/>
            <div className={styles.rmImportBtn} onClick={removeImportedItem}>
                <span>&times;</span>
            </div>
        </div>
    )
}