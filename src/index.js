import { createContext } from "react"
import reactDOM from "react-dom"

import App from "./components/app"

const AppContext = createContext()


const RootNode = () => {
    

    return (
        <AppContext.Provider value={null} >
            <App />
        </AppContext.Provider>
    )
}


reactDOM.render(<RootNode />, document.querySelector("#app"))

export default AppContext
