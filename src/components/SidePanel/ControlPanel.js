import { useContext, useCallback } from "react"
import { Select, Input, Typography, Space, Button, Switch } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

import { sortingFns, metaFormats } from "../../hooks/useSettings"
import AppContext from "../../AppContext"
import styles from "./style.css"

const { Text } = Typography
const { Option } = Select

export default () => {
    const { settings: {
        sortingFn,
        metaFormat,
        margin,
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
                        <Text type="secondary">rect sorting function</Text>
                        <Select value={sortingFn} onChange={value => updateSettings({ sortingFn: value })} size="large">
                            {sortingFns.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                        </Select>
                    </Space>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">export metadata format</Text>
                        <Select value={metaFormat} onChange={value => updateSettings({ metaFormat: value })}>
                            {metaFormats.map((name, i) => <Option key={i} value={name}>JSON {name}</Option>)}
                        </Select>
                    </Space>
                </div>
                <div>
                    <Space direction="vertical">
                        <Text type="secondary">margin around the sprite</Text>
                        <Input className={styles.input} addonBefore="margin-x" value={margin.x} addonAfter="px"/>
                        <Input className={styles.input} addonBefore="margin-y" value={margin.y} addonAfter="px"/>
                    </Space>
                </div>
                <div>
                    <Space>
                        <Text type="secondary">Sprite Rotation</Text>
                        <Switch checked={rotationEnabled} onChange={checked => updateSettings({ rotationEnabled: checked })}/>
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