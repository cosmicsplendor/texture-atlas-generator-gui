import { useContext, useMemo, useCallback } from "react"
import { Space, Typography, Input, Select, Slider } from "antd"

import { clamp } from "../../utils"
import AppContext from ".././../AppContext"
import placeholderImg from "../../images/placeholder.png"
import styles from "./style.css"
import { HBOX_SLIDER_W, HBOX_EDITOR_W, HBOX_EDITOR_IMG_W } from "../../constants"

const sliderStyles = {
    hor: { width: HBOX_SLIDER_W },
    vert: { height: HBOX_SLIDER_W }
}
const hitboxEditorStyle = {
    width: HBOX_EDITOR_W,
    height: HBOX_EDITOR_W
}
const hitboxEditorImgStyle = {
    width: HBOX_EDITOR_IMG_W,
    height: HBOX_EDITOR_IMG_W
}
const hitboxShapes = [ "Circle", "Rectangle"]

const { Text } = Typography
const { Option } = Select

const calcSliderRange = (width, height) => {
    const max = Math.max(width, height)
    const sliderWidth = (width / max) * HBOX_SLIDER_W
    const sliderHeight = (height / max) * HBOX_SLIDER_W
    const sliderX = (HBOX_SLIDER_W - sliderWidth) / 2
    const sliderY = (HBOX_SLIDER_W - sliderHeight) / 2
    return {
        hor: [ Math.floor(sliderX), Math.ceil(sliderX + sliderWidth) ],
        vert: [ Math.floor(sliderY), Math.ceil(sliderY + sliderHeight) ]
    }
}

const calcHitboxRectBounds = sliderRange => {
    const { hor: [ x1, x2 ], vert: [ y1, y2 ] } = sliderRange
    const scaleFactor = HBOX_EDITOR_IMG_W / HBOX_SLIDER_W
    const offset = (HBOX_EDITOR_W - HBOX_EDITOR_IMG_W) / 2
    return {
        left: x1 * scaleFactor + offset,
        top: y1 * scaleFactor + offset,
        width: (x2 - x1) * scaleFactor,
        height: (y2 - y1) * scaleFactor
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
    const hitboxElBounds = calcHitboxRectBounds(sliderRange)
    const hitboxElStyle = hitboxElBounds
    const updateHorSlider = useCallback(([ from, to ]) => {
        const [ min, max ] = calcSliderRange(width, height).hor
        const x1 = clamp(min, max, from)
        const x2 = clamp(min, max, to)
        const newHor = [ Math.min(x1, x2), Math.max(x1, x2) ]
        importAxns.update({ id: activeSpriteID, hitboxSlider: { ...sliderRange, hor: newHor } })
    }, [ activeSpriteID, sliderRange ])
    const updateVertSlider = useCallback(([ from, to ]) => {
        const [ min, max ] = calcSliderRange(width, height).vert
        const y1 = clamp(min, max, from)
        const y2 = clamp(min, max, to)
        const newVert = [ Math.min(y1, y2), Math.max(y1, y2) ]
        importAxns.update({ id: activeSpriteID, hitboxSlider: { ...sliderRange, vert: newVert } })
    }, [ activeSpriteID, sliderRange ])

    return (
        <div>
            <h3>
                Hitbox Editor
            </h3>
            <Space>
                <Space direction="vertical">
                   <div className={styles.hitboxEditor} style={hitboxEditorStyle}>
                        <Slider 
                            className={styles.hSlider} 
                            style={sliderStyles.hor} 
                            range={{draggableTrack: true}} 
                            value={sliderRange.hor} 
                            onChange={updateHorSlider} 
                            disabled={inputsDisabled}
                            min={0}
                            max={HBOX_SLIDER_W}
                        />
                        <Slider 
                            className={styles.vSlider} 
                            style={sliderStyles.vert } 
                            vertical 
                            range={{draggableTrack: true}} 
                            value={sliderRange.vert} 
                            onChange={updateVertSlider} 
                            disabled={inputsDisabled} 
                            reverse
                            min={0}
                            max={HBOX_SLIDER_W}
                        />
                        <img 
                            className={styles.metaImage} 
                            src={spriteImg || placeholderImg} 
                            style={hitboxEditorImgStyle}
                        />
                        <div className={styles.hitbox} style={hitboxElStyle}/>
                   </div>
                </Space>
                <Space direction="vertical">
                        <Space direction="vertical">
                            <Text type="secondary">Texture Name</Text>
                            <Input 
                                className={styles.input} 
                                value={name} placeholder="not selected" 
                                onChange={e => importAxns.update({ id: activeSpriteID, name: e.target.value })} 
                                disabled={inputsDisabled}
                            />
                        </Space>
                        <Space direction="vertical">
                            <Text type="secondary">Hitbox Shape</Text>
                            <Select 
                                value={hitboxShapes[1]} 
                                className={styles.select} 
                                onChange={value => {/* updateSettings({ sortingFn: value }) */}} 
                                size="large" 
                                disabled={inputsDisabled}
                            >
                                {hitboxShapes.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                            </Select>
                        </Space>
                    </Space>
            </Space>
        </div>
    )
}