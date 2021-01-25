import { PageHeader, Button, Tag } from "antd"

import Canvas from "./Canvas"
import SidePanel from "./SidePanel"
import ImportPanel from "./ImportPanel"
import styles from "./style.css"

const  App = () => {
    return (
        <div id="app">
            <PageHeader
                ghost={false}
                backIcon=""
                onBack={() => {}}
                title="Texture Atlas Generator GUI"
                subTitle="made with"
                tags={<Tag color="blue">React.js</Tag>}
                extra={
                    <Button type="danger">
                        Clear App
                    </Button>
                }
                className={styles.appbar}
            />
            <ImportPanel />
            <div className={styles.upperSection}>
                <SidePanel />
                <Canvas />
            </div>
        </div>
    )
}

export default App