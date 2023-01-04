import { useContext, useMemo } from "react"

import AppContext from "../../../AppContext"
import ImportedItem from "./ImportedItem"
import styles from "../style.css"

export default () => {
    const { imports, setActiveSprite } = useContext(AppContext)
    console.log(imports)
    
    return (
        <>
            { 
                imports.length ? 
                <div className={styles.importsContainer}> {imports.map(item => <ImportedItem key={item.id} {...item}/>)} </div> :
                <div className={styles.noImportsMsg}> No Images Imported Yet </div> 
            }
        </>
    )
}