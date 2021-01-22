import Canvas from "./Canvas"
import SidePanel from "./SidePanel"
import ImportPanel from "./ImportPanel"

const  App = () => {
    return (
        <div id="app">
            <div className="upper-section">
                <SidePanel />
                <Canvas />
            </div>
            <ImportPanel />
        </div>
    )
}

export default App