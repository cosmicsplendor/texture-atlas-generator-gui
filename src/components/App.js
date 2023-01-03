import { PageHeader, Tag } from "antd"

import Canvas from "./Canvas"
import SidePanel from "./SidePanel"
import ImportPanel from "./ImportPanel"
import ClearBtn from "./ClearBtn"
import styles from "./style.css"

const  App = () => {
    return (
        <div id="app">
            <PageHeader
                ghost={false}
                backIcon=""
                onBack={() => {}}
                title="Texture Atlas Generator GUI"
                subTitle="made with ❤️ by"
                tags={<Tag color="blue"><a style={{color: "#1890ff"}} href="https://twitter.com/UmeshKC60030736" target="_blank">Umesh KC</a></Tag>}
                extra={
                    <ClearBtn />
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