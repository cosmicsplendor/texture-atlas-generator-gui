import { useState } from "react"
import reactDOM from "react-dom"

import App from "./components/App"
import AppContext from "./AppContext"
import useImport from "./hooks/useImports"
import useSettings from "./hooks/useSettings"
const AppContainer = () => {
    const [ activeSprite, setActiveSprite ] = useState("")
    const { imports, importAxns } = useImport()
    const [ settings, updateSettings ] = useSettings()
    return (
        <AppContext.Provider value={{ imports, importAxns, settings, updateSettings, activeSprite, setActiveSprite }} >
            <App />
        </AppContext.Provider>
    )
}

reactDOM.render(<AppContainer />, document.querySelector("#app-container"))
