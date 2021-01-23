import ImportedItems from "./ImportedItemsList"
import ImportBtn from "./ImportBtn"
import Panel from "../UIPrimitives/Panel"
import styles from "./style.css"

export default () => {
    return (
        <Panel className={styles.importPanel}>
            <ImportBtn />
            <ImportedItems />
        </Panel>
    )
}