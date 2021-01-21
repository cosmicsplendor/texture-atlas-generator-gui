import reactDOM from "react-dom"

import App from "./components/App"
import AppContext from "./AppContext"
import useImport from "./hooks/useImports"

const AppContainer = () => {
    const { imports } = useImport()
    return (
        <AppContext.Provider value={{ imports }} >
            <App />
        </AppContext.Provider>
    )
}

reactDOM.render(<AppContainer />, document.querySelector("#app"))

export default AppContext
