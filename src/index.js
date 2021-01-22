import reactDOM from "react-dom"

import App from "./components/App"
import AppContext from "./AppContext"
import useImport from "./hooks/useImports"

const AppContainer = () => {
    const { imports, importAxns } = useImport()
    return (
        <AppContext.Provider value={{ imports, importAxns }} >
            <App />
        </AppContext.Provider>
    )
}

reactDOM.render(<AppContainer />, document.querySelector("#app-container"))

export default AppContext
