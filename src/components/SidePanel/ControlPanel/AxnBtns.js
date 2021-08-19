import { useContext, useCallback } from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"

import * as download from "../../../utils/download"
import AppContext from "../../../AppContext"
import texAtlas from "../../../utils/texAtlas"
import styles from "../style.css"

export default () => {
    const { settings: { metaFormat }, imports } = useContext(AppContext)

    const downloadMeta = useCallback(() => {
        if (imports.length === 0) return
        const body = JSON.stringify(texAtlas.getMeta(metaFormat, imports))
        download.text({ 
            body, name: "atlasmeta", 
            format: "cson"
        })
    }, [ imports, metaFormat ])
    
    const downloadImg = useCallback(() => {
        if (imports.length === 0) return
        download.canvas({ 
            canvas: texAtlas.renderer.canvas, 
            offscreen: true, 
            name: "texatlas", 
            format: "png"
        })
    }, [ imports, metaFormat ])

    return (
        <Space className={styles.axnBtn} size="large">
            <Button type="primary" danger onClick={downloadImg}> 
                <DownloadOutlined />
                <span>Image</span>
            </Button>
            <Button type="primary" danger onClick={downloadMeta}> 
                <DownloadOutlined />
                <span>Data</span>
            </Button>
        </Space>
    )
}