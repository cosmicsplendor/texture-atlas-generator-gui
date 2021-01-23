import { Select, Checkbox, Input, Space } from "antd"

import Panel from "../UIPrimitives/Panel"
import styles from "./style.css"

const { Option } = Select

const algorithms = [
    "algorithm1",
    "algorithm2",
    "algorithm3"
]

export default () => {
    return (
        <Panel>
            <h3>
                Control Panel
            </h3>
           <Space direction="vertical">
                <div>
                    <Space>
                        <Select defaultValue={algorithms[0]} placeholder="sorting algorithm">
                            {algorithms.map((a, i)=> <Option key={i} value={a}>{a}</Option>)}
                        </Select>
                        <div>Sorting Algorithm</div>
                    </Space>
                </div>
                <div>
                    <Space>
                        <Input className={styles.input} addonBefore="margin-x" addonAfter="px" rows={3}/>
                    </Space>
                </div>
                <div>
                    <Space>
                        <Input className={styles.input} addonBefore="margin-y" addonAfter="px"/>
                    </Space>
                </div>
                <div>
                    <Space>
                        <Checkbox defaultChecked />
                        <span>Enable Sprite Rotation</span>
                    </Space>
                </div>
           </Space>
        </Panel>
    )
}