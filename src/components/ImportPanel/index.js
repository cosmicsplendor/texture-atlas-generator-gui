import ImportedItems from "./ImportedItemsList"
import ImportBtn from "./ImportBtn"
import styles from "./style.css"

export default () => {
    return (
        <div className={styles.importPanel}>
            <ImportBtn />
            <ImportedItems />
        </div>
    )
}