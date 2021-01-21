import { useContext } from "react"

import AppContext from "../../AppContext"

export default () => {
    const { imports } = useContext(AppContext)

    return (
        <>
            { imports.length ? imports.map(item => {
                    return  <div>{item}</div>
              }): <div className="empty-imports-msg"> No Images Imported Yet</div> }
        </>
    )
}