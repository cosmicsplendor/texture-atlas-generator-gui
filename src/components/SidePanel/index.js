import { Space } from "antd"

import ControlPanel from "./ControlPanel"
import MetaPanel from "./MetaPanel"


export default () => {
    return (
        <div>
           <Space direction="vertical">
            <ControlPanel />
            <MetaPanel />
           </Space>
        </div>
    )
}
