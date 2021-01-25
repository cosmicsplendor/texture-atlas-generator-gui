import { Space } from "antd"

import Panel from "../UIPrimitives/Panel"
import ControlPanel from "./ControlPanel"
import MetaPanel from "./MetaPanel"


export default () => {
    return (
        <Panel>
            <Space direction="vertical" size="large">
                <ControlPanel />
                <MetaPanel />
            </Space>
        </Panel>
    )
}
