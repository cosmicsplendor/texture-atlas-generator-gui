import { useContext } from "react"

import AppContext from "../../../AppContext"
import ImportedItem from "./ImportedItem"

export default () => {
    const { imports } = useContext(AppContext)

    return (
        <>
            { 
                imports.length ? 
                imports.map(item => <ImportedItem key={item.id} {...item}/>) :
                <div className="empty-imports-msg"> No Images Imported Yet </div> 
            }
        </>
    )
}