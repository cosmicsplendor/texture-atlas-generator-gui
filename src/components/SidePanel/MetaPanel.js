import { useContext, useMemo } from "react"
import { Space, Typography, Input, Select, Slider } from "antd"

import AppContext from ".././../AppContext"
import placeholderImg from "../../images/placeholder.png"
import styles from "./style.css"

const { Text } = Typography
const { Option } = Select

const hitboxShapes = [ "Circle", "Rectangle"]

export default () => {
    const { activeSprite, imports, importAxns } = useContext(AppContext)
    const { src: spriteImg, name } = useMemo(() => {
        return imports.find(({ id }) => activeSprite === id)
    }, [ activeSprite, imports ]) || {}
    const inputsDisabled = !activeSprite
    return (
        <div>
            <h3>
                Hitbox Editor
            </h3>
            <Space>
                <Space direction="vertical">
                   <div className={styles.hitboxEditor}>
                        <Slider className={styles.hSlider} range={{draggableTrack: true}} defaultValue={[0, 100]}/>
                        <Slider className={styles.vSlider} vertical range={{draggableTrack: true}} defaultValue={[0, 100]}/>
                        <img className={styles.metaImage} src={spriteImg || placeholderImg}/>
                   </div>
                </Space>
                <Space direction="vertical">
                        <Space direction="vertical">
                            <Text type="secondary">Selected Sprite Name</Text>
                            <Input className={styles.input} value={name} placeholder="not selected" onChange={e => importAxns.update({ id: activeSprite, name: e.target.value })}/>
                        </Space>
                        <Space direction="vertical">
                            <Text type="secondary">Hitbox Shape</Text>
                            <Select value={hitboxShapes[1]} className={styles.select} onChange={value => {/* updateSettings({ sortingFn: value }) */}} size="large">
                                {hitboxShapes.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                            </Select>
                        </Space>
                    </Space>
            </Space>
        </div>
    )
}