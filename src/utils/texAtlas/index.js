import Node from "./entities/Node"
import Canvas2DRenderer from "./renderer/Canvas2D"
import Texture from "./entities/core/Texture"
import packRects from "../packer"

const spriteToTexture = ({ src, name }) => {
    const tex = new Texture({ imgUrl: src, name })
    tex.width = tex.img.width
    tex.height = tex.img.height
    return tex
}
export default { // singleton object
    _meta: null,
    atlas: new Node(),
    config: {},
    renderer: null,
    onscreenCanvas: null,
    init(canvasID) {
        const offscreenCanvas = new OffscreenCanvas(200, 200)

        this.renderer = new Canvas2DRenderer({ canvas: offscreenCanvas, scene: this.atlas })
        this.onscreenCanvas = document.getElementById(canvasID)
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
        const { packedRects: packedTextures, dim } = packRects({ rects: textures, ...config})

        packedTextures.forEach(tex => {
            atlas.add(tex)
        })

        renderer.canvas.width = dim.width
        renderer.canvas.height = dim.height
        renderer.renderRecursively()

        this._meta = packedTextures.length ? packedTextures: null
    },
    getMeta() {
        return this._meta
    }
}