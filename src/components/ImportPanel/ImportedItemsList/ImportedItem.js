import styles from "../style.css"

export default ({ src }) => {
    return (
        <img src={src} className="import-panel-item" className={styles.importedImg}/>
    )
}