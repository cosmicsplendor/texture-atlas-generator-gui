import styles from "./style.css"

export default ({ children, className, ...props }) => {
    const aggClassName = `${styles.panel} ${className || ""}`
    return <div className={aggClassName} {...props}>
        {children}
    </div>
}