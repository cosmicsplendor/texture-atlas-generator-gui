import Canvas from "./Canvas"
import SidePanel from "./SidePanel"
import ImportPanel from "./ImportPanel"

const  App = () => {
    return (
        <div>
            <div>
                <SidePanel />
                <Canvas />
            </div>
            <ImportPanel />
        </div>
    )
}

export default App