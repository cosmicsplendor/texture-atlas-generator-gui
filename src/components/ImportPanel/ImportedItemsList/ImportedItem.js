import checkboardImg from "./checkboard.png"
export default ({ src }) => {
    return (
        <img src={src} className="import-panel-item" style={{ background: `url(${checkboardImg})`, backgroundSize: "100px 100px"}}/>
    )
}