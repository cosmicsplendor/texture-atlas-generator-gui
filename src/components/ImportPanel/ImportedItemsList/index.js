import { useContext } from "react"

import AppContext from "../../../AppContext"
import ImportedItem from "./ImportedItem"
import styles from "../style.css"

export default () => {
    const { imports } = useContext(AppContext)

    return (
        <>
            { 
                imports.length ? 
                imports.map(item => <ImportedItem key={item.id} {...item}/>) :
                <div className={styles.noImportsMsg}> No Images Imported Yet </div> 
            }
        </>
    )
}