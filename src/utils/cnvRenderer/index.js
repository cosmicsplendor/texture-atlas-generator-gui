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

export default function cnvRenderer(canvasID) {
    const texAtlas = new Node()
    const renderer = new Canvas2DRenderer({ canvasId: canvasID, scene: texAtlas })
    const config = {}
    return {
        applySettings: (settings) => {
            const configKeys = Object.keys(settings)
            for (const key of configKeys) {
                config[key] = settings[key]
            }
        },
        clear() {
            texAtlas.children = []
            renderer.clear()
        },
        render(sprites) {
            this.clear()
            const textures = sprites.map(spriteToTexture)
            console.log(textures)
            const packedTextures = packRects({ rects: textures, ...config})

            packedTextures.forEach(tex => {
                texAtlas.add(tex)
            })

            renderer.renderRecursively()
        },
    }
}