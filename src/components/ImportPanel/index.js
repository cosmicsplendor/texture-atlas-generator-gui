import ImportedItems from "./ImportedItemsList"
import ImportBtn from "./ImportBtn"

export default () => {
    return (
        <div className="import-panel">
            <ImportBtn />
            <ImportedItems />
        </div>
    )
}