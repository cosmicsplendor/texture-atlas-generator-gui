import Node from "./entities/Node"
import Canvas2DRenderer from "./renderer/Canvas2D"
import Texture from "./entities/core/Texture"
import packRects from "../packer"
import { PREVIEW_ID, HBOX_SLIDER_W } from "../../constants"

const spriteToTexture = ({ src, name, id, hitboxSlider }) => {
    const tex = new Texture({ imgUrl: src })
    tex.width = tex.img.width
    tex.height = tex.img.height
    tex.name = name.replace("\..+$", "")
    if (!!hitboxSlider) {
        const { hor: [ x1, x2 ], vert: [ y1, y2 ] } = hitboxSlider
        const { width, height } = tex
        const { round } = Math
        const maxDim = Math.max(width, height)
        const offsetX = - (maxDim - width) / 2
        const offsetY = - (maxDim - height) / 2
        tex.hitbox = {
            x: round(x1 * width / HBOX_SLIDER_W) + offsetX,
            y: round(y1 * height / HBOX_SLIDER_W) + offsetY,
            width: round((x2 - x1) * width / HBOX_SLIDER_W),
            height: round((y2 - y1) * height / HBOX_SLIDER_W)
        }
    }
    tex.id = id
    return tex
}

const texAtlas = { // singleton object
    _meta: null,
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

        this._meta = packedTextures
    },
    getMeta(format, circle=false) {
        switch(format) {
            case "Hash":
                return this._meta.reduce((acc, cur) => {
                    const { name, pos, rotation, width, height, hitbox } = cur
                    acc[name] = { ...pos, rotation, width, height, hitbox }
                    
                    return acc
                }, {})
            case "Array":
                return this._meta.map(({ name, pos, rotation, width, height }) => ({
                    name, ...pos, rotation, width, height
                }))
            break
        }
    }
}

texAtlas.init()

export default texAtlas