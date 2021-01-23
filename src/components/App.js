import Canvas from "./Canvas"
import SidePanel from "./SidePanel"
import ImportPanel from "./ImportPanel"
import styles from "./style.css"

const  App = () => {
    return (
        <div id="app">
            <div className={styles.upperSection}>
                <SidePanel />
                <Canvas />
            </div>
            <ImportPanel />
        </div>
    )
}

export default App