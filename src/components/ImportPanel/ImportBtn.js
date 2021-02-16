import { useCallback, useContext } from "react"
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
                resolve({ name: file.name, src: result, width: tempImg.width, height: tempImg.height })
            }
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export default () => {
    const { importAxns } = useContext(AppContext)

    const onNewFiles = useCallback(async e => {
        for (const file of e.target.files) {
            const newImport = await readFile(file)
            importAxns.add(newImport)
        }
    }, [])

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