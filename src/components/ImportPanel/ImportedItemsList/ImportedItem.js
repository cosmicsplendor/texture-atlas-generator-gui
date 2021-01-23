import { useContext, useCallback } from "react"

import AppContext from "../../../AppContext"
import styles from "../style.css"

export default ({ src, id }) => {
    const { importAxns } = useContext(AppContext)
    const removeImportedItem = useCallback(() => {
        importAxns.remove({ id })
        console.log("This was called")
    }, [])
    return (
        <div className={styles.importedItem}>
            <img src={src} className={styles.importedImg}/>
            <div className={styles.rmImportBtn} onClick={removeImportedItem}>&times;</div>
        </div>
    )
}