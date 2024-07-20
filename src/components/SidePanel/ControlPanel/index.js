import { useContext } from "react"
import { Select, Input, Typography, Space, Switch } from "antd"

import { metaFormats, algorithms } from "../../../hooks/useSettings"
import AxnBtns from "./AxnBtns"
import AppContext from "../../../AppContext"
import styles from "../style.css"

const { Text } = Typography
const { Option } = Select

export default () => {
    const { settings: {
        metaFormat,
        margin,
        algorithm,
        rotationEnabled
    }, updateSettings } = useContext(AppContext)
    return (
        <div>
            <h3>
                Settings 
            </h3>
           <Space direction="vertical">
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">export format</Text>
                        <Select value={metaFormat} className={styles.select} onChange={value => updateSettings({ metaFormat: value })} style={{ width: 250 }}>
                            {metaFormats.map(({name}, i) => <Option key={i} value={name}>{name}</Option>)}
                        </Select>
                    </Space>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">packing algorithm</Text>
                        <Select value={algorithm} className={styles.select} onChange={value => updateSettings({ algorithm: value })} size="large"  style={{ width: 250 }}>
                            {algorithms.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                        </Select>
                    </Space>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">margin around the sprite</Text>
                        <Space>
                            <Input className={styles.input} addonBefore="x" type="number" value={margin.x} addonAfter="px" onChange={e => updateSettings({ margin: { x: Math.max(Number.parseInt(e.target.value || 0), 0) }})}/>
                            <Input className={styles.input} addonBefore="y" type="number" value={margin.y} addonAfter="px" onChange={e => updateSettings({ margin: { y: Math.max(Number.parseInt(e.target.value || 0), 0) }})}/>
                        </Space>
                    </Space>
                </div>
                <div>
                    <Space>
                        <Text type="secondary">Sprite Rotation</Text>
                        <Switch disabled={algorithm === "Max Rects"} checked={rotationEnabled} onChange={checked => updateSettings({ rotationEnabled: checked })}/>
                    </Space>
                </div>
                <AxnBtns />
           </Space>
        </div>
    )
}