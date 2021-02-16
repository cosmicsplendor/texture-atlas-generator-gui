import { Space } from "antd"

import Panel from "../UIPrimitives/Panel"
import ControlPanel from "./ControlPanel"
import MetaPanel from "./MetaPanel"

import styles from "./style.css"


export default () => {
    return (
        <Panel className={styles.sidePanel}>
            <Space direction="vertical" size="large">
                <MetaPanel />
                <ControlPanel />
            </Space>
        </Panel>
    )
}
