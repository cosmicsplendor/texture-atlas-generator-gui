import { DownloadOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"

import * as download from "../../../utils/download"
import texAtlas from "../../../utils/texAtlas"
import { CNV_ID } from "../../../constants"
import styles from "../style.css"

const downloadMeta = () => {
    const body = JSON.stringify(texAtlas.getMeta(), null, 4)
    download.text({ body, name: "", format: "json"})
}

const downloadImg = () => {
    download.canvas({ canvasID: CNV_ID, name: "atlas", format: "png"})
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