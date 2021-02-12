import { DownloadOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"

import * as download from "../../../utils/download"
import texAtlas from "../../../utils/texAtlas"
import { CNV_ID } from "../../../constants"
import styles from "../style.css"

const downloadMeta = () => {
    if (!texAtlas.getMeta()) return
    const body = JSON.stringify(texAtlas.getMeta(), null, 4)
    download.text({ body, name: `atlasmeta-${Date.now()}`, format: "json"})
}

const downloadImg = () => {
    if (!texAtlas.getMeta()) return
    download.canvas({ canvasID: CNV_ID, name: `texatlas-${Date.now()}`, format: "png"})
}

export default () =>(
    <Space className={styles.axnBtn} size="large">
        <Button type="primary" danger onClick={downloadImg}> 
            <DownloadOutlined />
            <span>Image</span>
        </Button>
        <Button type="primary" danger onClick={downloadMeta}> 
            <DownloadOutlined />
            <span>JSON</span>
        </Button>
    </Space>
)