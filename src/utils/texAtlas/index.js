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
    init(canvasID) {
        this.renderer = new Canvas2DRenderer({ canvasId: canvasID, scene: this.atlas })
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
        const packedTextures = packRects({ rects: textures, ...config})

        packedTextures.forEach(tex => {
            atlas.add(tex)
        })

        renderer.renderRecursively()

        this._meta = packedTextures.length ? packedTextures: null
    },
    getMeta() {
        return this._meta
    }
}