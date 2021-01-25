import reactDOM from "react-dom"

import App from "./components/App"
import AppContext from "./AppContext"
import useImport from "./hooks/useImports"
import useSettings from "./hooks/useSettings"
import "./style.css"

const AppContainer = () => {
    const { imports, importAxns } = useImport()
    const [ settings, updateSettings ] = useSettings()
    return (
        <AppContext.Provider value={{ imports, importAxns, settings, updateSettings }} >
            <App />
        </AppContext.Provider>
    )
}

reactDOM.render(<AppContainer />, document.querySelector("#app-container"))
