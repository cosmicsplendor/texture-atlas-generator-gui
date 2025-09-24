import { Tag, Typography } from "antd"
import { PageContainer } from "@ant-design/pro-components"
const { Text } = Typography

import Canvas from "./Canvas"
import SidePanel from "./SidePanel"
import ImportPanel from "./ImportPanel"
import ClearBtn from "./ClearBtn"
import styles from "./style.css"

const  App = () => {
    return (
        <div id="app">
            <PageContainer
                header={{
                    title: "Online Texture Atlas Generator",
                    subTitle: "made with ❤️ by",
                    tags: (
                        <Tag color="blue">
                        <a
                            href="https://twitter.com/frigidelixir"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Text style={{ color: "#1890ff" }}>Umesh KC</Text>
                        </a>
                        </Tag>
                    ),
                    extra: <ClearBtn />,
                }}
                ghost={false}
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