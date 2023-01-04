import { useCallback, useContext } from "react"
import { notification } from "antd"
import { PlusOutlined } from "@ant-design/icons"

import AppContext from "../../AppContext"
import styles from "./style.css"

const readFile = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            const tempImg = new Image()

            const { result } = reader
            tempImg.src = result

            tempImg.onload = () => {
                resolve({ name: file.name.replace(/\..+/, "").trim(), originalName: file.name, src: result, width: tempImg.width, height: tempImg.height })
            }
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export default () => {
    const { importAxns, imports } = useContext(AppContext)

    const onNewFiles = useCallback(async e => {
        const newImports = []
        for (const file of e.target.files) {
            const newImport = await readFile(file)
            const duplicate = !!imports.some(({ name }) => {
                return name === newImport.name
            })
            if (duplicate) {
                notification.open({
                    message: "Duplicate Import",
                    description: `Attempting to import a duplicate image or an image with the filename that clashes with one of the already imported images: "${newImport.originalName}"`
                })
            } else {
                newImports.push(newImport)
            }
        }
        importAxns.add(newImports)
        e.target.value = null
    }, [ imports ])

    return (
       <>
        <input id="import-field" type="file" style={{ display: "none" }} onChange={onNewFiles} accept="image/*" multiple></input>
        <label htmlFor="import-field">
            <div className={styles.importBtn}>
                <PlusOutlined/>
            </div>
        </label>
       </>
    )
}