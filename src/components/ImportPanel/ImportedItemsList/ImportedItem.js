import { useContext, useCallback } from "react"

import AppContext from "../../../AppContext"
import styles from "../style.css"

export default ({ src, id }) => {
    const { importAxns } = useContext(AppContext)
    const removeImportedItem = useCallback(() => {
        importAxns.remove({ id })
    }, [])
    return (
        <div className={styles.importedItem}>
            <img src={src} className={styles.importedImg}/>
            <div className={styles.rmImportBtn} onClick={removeImportedItem}>
                <span>&times;</span>
            </div>
        </div>
    )
}