import { useContext, useCallback } from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"

import * as download from "../../../utils/download"
import AppContext from "../../../AppContext"
import texAtlas from "../../../utils/texAtlas"
import styles from "../style.css"
import { metaFormats } from "../../../hooks/useSettings"

export default () => {
    const { settings: { metaFormat }, imports } = useContext(AppContext)

    const downloadMeta = useCallback(async () => {
        if (imports.length === 0) return
        const body = await texAtlas.getMeta(metaFormat, imports)
        download.text({ 
            body, name: "texture", 
            format: metaFormats.find(mf => mf.name === metaFormat).ext
        })
    }, [ imports, metaFormat ])
    
    const downloadImg = useCallback(() => {
        if (imports.length === 0) return
        download.canvas({ 
            canvas: texAtlas.renderer.canvas, 
            offscreen: true, 
            name: "texture", 
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