import Node from "./entities/Node"
import Canvas2DRenderer from "./renderer/Canvas2D"
import Texture from "./entities/core/Texture"
import packRects from "../packer"
import { PREVIEW_ID, HBOX_EDITOR_W, HBOX_EDITOR_IMG_W, HBOX_SLIDER_W } from "../../constants"

const HBOX_EDITOR_IMG_OFFSET = (HBOX_EDITOR_W - HBOX_EDITOR_IMG_W) / 2

const spriteToTexture = sprite => {
    const { src, name, id, hitboxSlider, anchor, anchorPoint, hitshape } = sprite
    const tex = new Texture({ imgUrl: src })
    tex.width = tex.img.width
    tex.height = tex.img.height
    tex.name = name.replace("\..+$", "")
    const { round, max } = Math
    if (anchor) {
        const maxDim = max(tex.width, tex.height)
        const xOffset = -(maxDim - tex.width) / 2
        const yOffset = -(maxDim - tex.height) / 2
        tex.anchorPoint = anchorPoint ? 
        {
            x: round(maxDim * (anchorPoint.x - HBOX_EDITOR_IMG_OFFSET) / HBOX_EDITOR_IMG_W) + xOffset,
            y: round(maxDim * (anchorPoint.y - HBOX_EDITOR_IMG_OFFSET) / HBOX_EDITOR_IMG_W) + yOffset
        } :
        { x: round(tex.width / 2), y: round(tex.height / 2)}
    }
    if (!!hitboxSlider) {
        const { hor: [ x1, x2 ], vert: [ y1, y2 ] } = hitboxSlider
        const { width, height } = tex
        const maxDim = max(width, height)
        const offsetX = -(maxDim - width) / 2
        const offsetY = -(maxDim - height) / 2
        tex.hitbox = {
            x: round(maxDim * x1 / HBOX_SLIDER_W) + offsetX,
            y: round(maxDim * y1 / HBOX_SLIDER_W) + offsetY,
            width: round(maxDim * (x2 - x1)  / HBOX_SLIDER_W),
            height: round(maxDim * (y2 - y1) / HBOX_SLIDER_W)
        }
        if (hitshape === "CIRCLE") {
            tex.hitCirc = {
                x: tex.hitbox.x,
                y: tex.hitbox.y,
                radius: round(tex.hitbox.width / 2)
            }
            delete tex.hitbox
        }
    }
    tex.id = id
    return tex
}

const texAtlas = { // singleton object
    atlas: null,
    config: {},
    renderer: null,
    init() {
        const offscreenCanvas = new OffscreenCanvas(200, 200)
        this.atlas = new Node()
        this.renderer = new Canvas2DRenderer({ canvas: offscreenCanvas, scene: this.atlas })
    },
    applySettings(settings) {
        const configKeys = Object.keys(settings)
        for (const key of configKeys) {
            this.config[key] = settings[key]
        }
        return this
    },
    clear() {
        this.atlas.children = []
        this.renderer.clear()
    },
    render(sprites) {
        const { atlas, config, renderer } = this
        this.clear()
        const textures = sprites.map(spriteToTexture)
        const { packedRects: packedTextures, bound } = packRects({ rects: textures, ...config})

        packedTextures.forEach(tex => {
            atlas.add(tex)
        })

        renderer.canvas.width = bound.width
        renderer.canvas.height = bound.height
        renderer.renderRecursively()

        // sync with the preview
        renderer.canvas
            .convertToBlob()
            .then(blob => {
                document
                    .querySelector(`#${PREVIEW_ID}`)
                    .setAttribute("src", URL.createObjectURL(blob))
            })
            .catch(e => {
                // console.log(`Error:\n${e.message}`)
            })

        return packedTextures
    },
    getMeta(format, sprites) {
        switch(format) {
            case "Hash":
                return this.render(sprites).reduce((acc, cur) => {
                    const { name, pos, rotation, width, height, hitbox, hitCirc, anchorPoint } = cur
                    acc[name] = { ...pos, rotation, width, height, hitbox, hitCirc, pivot: anchorPoint }
                    
                    return acc
                }, {})
            case "Array":
                return this.render(sprites).map(({ name, pos, rotation, width, height, hitbox, hitCirc, anchorPoint }) => ({
                    name, ...pos, rotation, width, height, hitbox, hitCirc, pivot: anchorPoint
                }))
            break
        }
    }
}

texAtlas.init()

export default texAtlas