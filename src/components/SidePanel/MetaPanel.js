import { useContext, useMemo, useCallback } from "react"
import { Space, Typography, Input, Select, Slider } from "antd"

import AppContext from ".././../AppContext"
import placeholderImg from "../../images/placeholder.png"
import styles from "./style.css"
import { HBOX_SLIDER_H, HBOX_SLIDER_W } from "../../constants"

const sliderStyles = {
    hor: { width: HBOX_SLIDER_W },
    vert: { height: HBOX_SLIDER_H }
}

const { Text } = Typography
const { Option } = Select

const hitboxShapes = [ "Circle", "Rectangle"]

const calcSliderRange = (width, height) => {
    const max = Math.max(width, height)
    const sliderWidth = (width / max) * 100
    const sliderHeight = (height / max) * 100
    const sliderX = (100 - sliderWidth) / 2
    const sliderY = (100 - sliderHeight) / 2
    return {
        hor: [ Math.round(sliderX), Math.round(sliderX + sliderWidth) ],
        vert: [ Math.round(sliderY), Math.round(sliderY + sliderHeight) ]
    }
}

export default () => {
    const { activeSprite: activeSpriteID, imports, importAxns } = useContext(AppContext)
    const activeSprite = useMemo(() => {
        return imports.find(({ id }) => activeSpriteID === id) || {}
    }, [ activeSpriteID, imports ])
    const inputsDisabled = !activeSpriteID
    const { src: spriteImg, name, width=150, height=150, hitboxSlider } = activeSprite
    const sliderRange = hitboxSlider || calcSliderRange(width, height)
    const updateHorSlider = useCallback(([ from, to ]) => {
        const [ fromMin, toMax ] = calcSliderRange(width, height).hor
        const x1 = Math.max(fromMin, from)
        const x2 = Math.min(to, toMax)
        importAxns.update({ id: activeSpriteID, hitboxSlider: { ...sliderRange, hor: [ x1, x2 ]}})
    }, [ activeSpriteID ])
    const updateVertSlider = useCallback(([ from, to ]) => {
        const [ fromMin, toMax ] = calcSliderRange(width, height).vert
        const y1 = Math.max(fromMin, from)
        const y2 = Math.min(to, toMax)
        importAxns.update({ id: activeSpriteID, hitboxSlider: { ...sliderRange, vert: [ y1, y2 ]}})
    }, [ activeSpriteID ])
    
    return (
        <div>
            <h3>
                Hitbox Editor
            </h3>
            <Space>
                <Space direction="vertical">
                   <div className={styles.hitboxEditor}>
                        <Slider className={styles.hSlider} style={sliderStyles.hor} range={{draggableTrack: true}} value={sliderRange.hor} onChange={updateHorSlider} disabled={inputsDisabled}/>
                        <Slider className={styles.vSlider} style={sliderStyles.vert } vertical range={{draggableTrack: true}} value={sliderRange.vert} onChange={updateVertSlider} disabled={inputsDisabled}/>
                        <img className={styles.metaImage} src={spriteImg || placeholderImg}/>
                   </div>
                </Space>
                <Space direction="vertical">
                        <Space direction="vertical">
                            <Text type="secondary">Sprite Name</Text>
                            <Input className={styles.input} value={name} placeholder="not selected" onChange={e => importAxns.update({ id: activeSpriteID, name: e.target.value })} disabled={inputsDisabled}/>
                        </Space>
                        <Space direction="vertical">
                            <Text type="secondary">Hitbox Shape</Text>
                            <Select value={hitboxShapes[1]} className={styles.select} onChange={value => {/* updateSettings({ sortingFn: value }) */}} size="large" disabled={inputsDisabled}>
                                {hitboxShapes.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                            </Select>
                        </Space>
                    </Space>
            </Space>
        </div>
    )
}