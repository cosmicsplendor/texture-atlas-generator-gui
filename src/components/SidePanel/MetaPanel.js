import { useContext, useMemo, useCallback, useRef } from "react"
import { Space, notification, Typography, Input, Select, Slider, Switch } from "antd"

import { clamp } from "../../utils"
import AppContext from ".././../AppContext"
import placeholderImg from "../../images/placeholder.png"
import styles from "./style.css"
import { HBOX_SLIDER_W, HBOX_EDITOR_W, HBOX_EDITOR_IMG_W } from "../../constants"
const HBOX_EDITOR_IMG_OFFSET = (HBOX_EDITOR_W - HBOX_EDITOR_IMG_W) / 2
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
const [ CIRCLE, RECTANGLE ] = [ "CIRCLE", "RECTANGLE" ]
const hitshapes = [ CIRCLE, RECTANGLE ]

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
    const hbEditorRef = useRef()
    const activeSprite = useMemo(() => {
        return imports.find(({ id }) => activeSpriteID === id) || {}
    }, [ activeSpriteID, imports ])
    const inputsDisabled = !activeSpriteID
    const { src: spriteImg, name, width=150, height=150, hitboxSlider, hitshape=RECTANGLE, anchor=false, anchorPoint={ x: HBOX_EDITOR_IMG_OFFSET + HBOX_EDITOR_IMG_W / 2, y: HBOX_EDITOR_IMG_OFFSET + HBOX_EDITOR_IMG_W / 2 } } = activeSprite
    const sliderRange = hitboxSlider || calcSliderRange(width, height, hitshape)
    const hitboxElBounds = calcHitboxRectBounds(sliderRange, hitshape)
    const hitboxElStyle = { ...hitboxElBounds, borderRadius: hitshape === RECTANGLE ? 0: "50%" }
    const updateHorSlider = useCallback(([ from, to ], hitshape) => {
        const { hor: [ min, max ], vert: [ minV, maxV ]} = calcSliderRange(width, height)
        if (hitshape === RECTANGLE) {
            const x1 = clamp(min, max, from)
            const x2 = clamp(min, max, to)
            const newHor = [ Math.min(x1, x2), Math.max(x1, x2) ]
            importAxns.update({ id: activeSpriteID, hitboxSlider: { ...sliderRange, hor: newHor }, hitshape })
            return
        }
        const draggedLeftEnd = sliderRange.hor[0] !== from ? true: false
        const maxRadius = Math.min( max - min, maxV - minV)
        const x1 = draggedLeftEnd ? Math.max(clamp(min, max, from), to - maxRadius): from
        const x2 = !draggedLeftEnd ? Math.min(clamp(min, max, to), from + maxRadius): to
        const newHor = [ Math.min(x1, x2), Math.max(x1, x2) ]
        const vertRadius = (x2 - x1) / 2
        const vertCenter = (sliderRange.vert[1] + sliderRange.vert[0] ) / 2
        let y1 = vertCenter - vertRadius
        let y2 = vertCenter + vertRadius
        if (y2 > maxV) { // wrap around
            y1 += maxV - y2
            y2 = maxV
        } else if (y1 < minV) {
            y2 += minV - y1
            y1 = minV
        }
        const newVert = [ y1, y2 ]
        importAxns.update({ id: activeSpriteID, hitboxSlider: { vert: newVert, hor: newHor }, hitshape })
    }, [ activeSpriteID, sliderRange, hitshape ])
    const updateVertSlider = useCallback(([ from, to ], hitshape) => {
        const [ min, max ] = calcSliderRange(width, height).vert
        const draggedBothEnds = sliderRange.vert[0] !== from && sliderRange.vert[1] !== to
        if (hitshape === CIRCLE) {
            if (!draggedBothEnds || from < min || to > max) {
                return
            }
        }
        const y1 = clamp(min, max, from)
        const y2 = clamp(min, max, to)
        const newVert = [ Math.min(y1, y2), Math.max(y1, y2) ]
        importAxns.update({ id: activeSpriteID, hitboxSlider: { ...sliderRange, vert: newVert } })
    }, [ activeSpriteID, sliderRange ])
    const setAnchorPoint = useCallback(function(e) {
        if (!anchor) {
            return
        }
        const { x: originX, y: originY } = hbEditorRef.current.getBoundingClientRect()
        const x = clamp(HBOX_EDITOR_IMG_OFFSET, HBOX_EDITOR_W - HBOX_EDITOR_IMG_OFFSET, e.clientX - originX)
        const y = clamp(HBOX_EDITOR_IMG_OFFSET, HBOX_EDITOR_W - HBOX_EDITOR_IMG_OFFSET, e.clientY - originY)
        console.log({ x, y })
        importAxns.update({ id: activeSpriteID, anchorPoint: { x, y } })
    }, [ anchor, activeSpriteID ])
    return (
        <div>
            <h3>
                Hitbox Editor
            </h3>
            <Space>
                <Space direction="vertical">
                   <div className={styles.hitboxEditor} style={hitboxEditorStyle} onMouseDown={setAnchorPoint} ref={hbEditorRef}>
                        <Slider 
                            className={styles.hSlider} 
                            style={sliderStyles.hor} 
                            range={{draggableTrack: true}} 
                            value={sliderRange.hor} 
                            onChange={arg => updateHorSlider(arg, hitshape)} 
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
                            onChange={arg => updateVertSlider(arg, hitshape)} 
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
                        { !!anchor  ? <div className={styles.anchorPoint} style={{ left: anchorPoint.x - 6, top: anchorPoint.y - 6 }}/>: null }
                   </div>
                </Space>
                <Space direction="vertical">
                        <Space direction="vertical">
                            <Text type="secondary">Texture Name</Text>
                            <Input 
                                className={styles.input} 
                                value={name} placeholder="not selected" 
                                onChange={e => {
                                    const newName = e.target.value
                                    const duplicate = !!imports.some(({ name }) => {
                                        return name === newName
                                    })
                                    if (duplicate) {
                                        notification.open({
                                            message: "Clashing Names",
                                            description: `"${newName}" clashes with the name of one of the imported textures. Name field has to be unique.`
                                        })
                                        return
                                    }
                                    importAxns.update({ id: activeSpriteID, name: newName})
                                }} 
                                disabled={inputsDisabled}
                            />
                        </Space>
                        <Space direction="vertical">
                            <Text type="secondary">Hitbox Shape</Text>
                            <Select 
                                value={hitshape} 
                                className={styles.select} 
                                onChange={value => {
                                    updateHorSlider([ 0, 150 ], value)
                                }} 
                                size="large" 
                                disabled={inputsDisabled}
                            >
                                {hitshapes.map((name, i) => <Option key={i} value={name}>{name}</Option>)}
                            </Select>
                        </Space>
                        <div>
                            <Space>
                                <Text type="secondary">Pivot Point</Text>
                                <Switch checked={anchor} onChange={checked => importAxns.update({ id: activeSpriteID, anchor: checked })} disabled={inputsDisabled}/>
                            </Space>
                        </div>
                    </Space>
            </Space>
        </div>
    )
}