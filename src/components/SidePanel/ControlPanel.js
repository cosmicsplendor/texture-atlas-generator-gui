import { Select, Input, Typography, Space, Button, Switch } from "antd"
import { DownloadOutlined, UndoOutlined } from "@ant-design/icons"

const { Text } = Typography

import styles from "./style.css"

const { Option } = Select

const algorithms = [
    "algorithm1 (default)",
    "algorithm2",
    "algorithm3"
]

export default () => {
    return (
        <div>
            <h3>
                Settings 
            </h3>
           <Space direction="vertical">
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">rect sorting function</Text>
                        <Select defaultValue="algorithm 1">
                            {algorithms.map((a, i)=> <Option key={i} value={a}>{a}</Option>)}
                        </Select>
                    </Space>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">export metadata format</Text>
                        <Select defaultValue="JSON Hash">
                            <Option value="array">JSON Array</Option>
                            <Option value="hash">JSON Hash</Option>
                        </Select>
                    </Space>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">margin around the sprite</Text>
                        <Input className={styles.input} addonBefore="margin-x" addonAfter="px" rows={3}/>
                        <Input className={styles.input} addonBefore="margin-y" addonAfter="px"/>
                    </Space>
                </div>
                <div>
                    <Space>
                        <Text type="secondary">Sprite Rotation</Text>
                        <Switch />
                    </Space>
                </div>
                <Space className={styles.axnBtn} size="large">
                    <Button> 
                        <DownloadOutlined />
                        <span>Image</span>
                    </Button>
                    <Button> 
                        <DownloadOutlined />
                        <span>JSON</span>
                    </Button>
                </Space>
           </Space>
        </div>
    )
}