import Node from "./entities/Node"
import Canvas2DRenderer from "./renderer/Canvas2D"
import Texture from "./entities/core/Texture"
import packRects from "../packer"
import packRectsBTBP from "../packer/legacy"
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
            { x: round(tex.width / 2), y: round(tex.height / 2) }
    }
    if (!!hitboxSlider) {
        const { hor: [x1, x2], vert: [y1, y2] } = hitboxSlider
        const { width, height } = tex
        const maxDim = max(width, height)
        const offsetX = -(maxDim - width) / 2
        const offsetY = -(maxDim - height) / 2
        tex.hitbox = {
            x: round(maxDim * x1 / HBOX_SLIDER_W) + offsetX,
            y: round(maxDim * y1 / HBOX_SLIDER_W) + offsetY,
            width: round(maxDim * (x2 - x1) / HBOX_SLIDER_W),
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

const computePreviewImgWidth = (containerBounds, imgBounds) => {
    const { width: cwidth, height: cheight } = containerBounds
    const { width, height } = imgBounds
    const needsResizing = cwidth <= width || cheight <= width
    if (!needsResizing) return [width, height]
    const caspect = cwidth / cheight
    const aspect = width / height

    if (caspect > aspect) {
        return [
            cheight * aspect,
            cheight
        ]
    }
    return [
        cwidth,
        cwidth / aspect
    ]
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
    async render(sprites) {
        const { atlas, config, renderer } = this
        this.clear()
        const textures = sprites.map(spriteToTexture)
        const { packedRects: packedTextures, bound } = config.algorithm === "Max Rects" ? await packRects({ rects: textures, ...config }): await packRectsBTBP({ rects: textures, ...config })

        packedTextures.forEach(tex => {
            atlas.add(tex)
        })
        renderer.canvas.width = bound.width
        renderer.canvas.height = bound.height
        renderer.renderRecursively()

        // sync with the preview
        const previewImg = document
            .querySelector(`#${PREVIEW_ID}`)
        previewImg.setAttribute("width", 0)
        previewImg.setAttribute("height", 0)
        renderer.canvas
            .convertToBlob()
            .then(blob => {
                previewImg.setAttribute("src", URL.createObjectURL(blob))
                const containerBounds = previewImg.parentElement.getBoundingClientRect()
                const onLoad = () => {
                    const [width, height] = computePreviewImgWidth(containerBounds, bound)
                    previewImg.width = width
                    previewImg.height = height
                }
                previewImg.onload = onLoad
            })
            .catch(e => {
                // console.log(`Error:\n${e.message}`)
                previewImg.setAttribute("src", null)
            })

        return packedTextures
    },
    async getMeta(format, sprites, outputName = "texture.png") {
        const data = await this.render(sprites)
        const previewImg = document.querySelector("#preview")
        const size = {
            width: parseInt(previewImg.getAttribute("width")),
            height: parseInt(previewImg.getAttribute("height"))
        }
        const generateHash = (data, mapper = cur => cur) => data.reduce((output, cur) => {
            output[cur.name] = mapper(cur)
            return output
        }, {})

        if (format === "JSON Hash") {
            const output = generateHash(data, cur => {
                const { pos, rotation, width, height, hitbox, hitCirc, anchorPoint } = cur
                return { ...pos, rotation, width, height, hitbox, hitCirc, pivot: anchorPoint }
            })
            return JSON.stringify(output)
        }

        if (format === "JSON Array") {
            const output = data.map(({ name, pos, rotation, width, height, hitbox, hitCirc, anchorPoint }) => ({
                name, ...pos, rotation, width, height, hitbox, hitCirc, pivot: anchorPoint
            }))
            return JSON.stringify(output)
        }

        if (format === "CSS Sprite") {
            return data.map(data => {
                const { name, pos, width, height, anchorPoint } = data
                const pivotPercent = anchorPoint ? {
                    x: Math.round(anchorPoint.x * 100 / width),
                    y: Math.round(anchorPoint.y * 100 / height)
                } : {}
                const trnsfrmOrigin = anchorPoint ? `transform-origin: ${pivotPercent.x}% ${pivotPercent.y}%;` : ""
                const cssDeclaration = `.${name} {display: inline-block; overflow: hidden; background: url(${outputName}) no-repeat -${pos.x} -${pos.y}; width: ${width}px; height: ${height}px; ${trnsfrmOrigin}}`
                return cssDeclaration
            }).join("\n")
        }
        
        if (format === "PIXI") {
            const output = {
                frames: generateHash(data, cur => {
                    const { pos, rotation, width, height, hitbox, hitCirc } = cur
                    const { anchorPoint = { x: width / 2, y: height / 2 } } = cur
                    const frame = { ...pos, w: width, h: height }
                    return { frame: frame, rotated: !!rotation, trimmed: false, spriteSourceSize: frame, sourceSize: { ...pos }, hitbox, hitCirc, pivot: { x: anchorPoint.x / width, y: anchorPoint.y / height } }
                }),
                meta: {
                    size: { width: size.width, height: size.height },
                    scale: 1
                }
            }
            return JSON.stringify(output)
        }

        if (format === "Unity3D") {
            return [
                "#",
                "# Texture atlas data for Unity#D.",
                "#",
                "# Download this TexturePackerImporter from unity asset store to use this texture atlas",
                "# https://assetstore.unity.com/packages/tools/sprite-management/texturepacker-importer-16641",
                "#",
                "#",
                ":format=40300",
                `:texture=${outputName}`,
                `:size=${size.width}x${size.height}`,
                ":pivotpoints=enabled",
                ":borders=disabled",
                "",
                ...data.map(({ name, pos, width, height, anchorPoint }) => {
                    const pivotX = anchorPoint ? anchorPoint.x / width: 0.5
                    const pivotY = anchorPoint ? anchorPoint.y / height: 0.5
                    return `${name};${pos.x};${pos.y};${width};${height};${pivotX};${pivotY};0;0;0;0`
                }),
                // "ball.png;276;76;64;64; 0.5;0.5; 0;0;0;0",
            ].join("\n")
        }

        if (format === "Godot") {
            const output = {
                textures: [
                    {
                        image: outputName,
                        size: {
                            w: size.width,
                            h: size.height
                        },
                        sprites: data.map(({ name, pos, width, height, rotation, anchorPoint }) => ({
                            filename: name,
                            region: {
                                ...pos,
                                w: width,
                                h: height
                            },
                            margin: {
                                x: 0, y: 0, w: 0, h: 0
                            },
                            rotation,
                            pivot: anchorPoint
                        }))
                    }
                ]
            }
            return JSON.stringify(output)
        }

        if (format === "Cocos 2D") {
            return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
    <key>frames</key>
    <dict>
        ${data.map(cur => {
        const { pos, width, height, rotation } = cur
        const frame = `{{${pos.x},${pos.y}}, {${width},${height}}}`
        const sourceSize = `{${width},${height}}`
        return `<key>${cur.name}</key>
        <dict>
        <key>frame</key>
        <string>${frame}</string>
        <key>offset</key>
        <string>{0,0}</string>
        <key>rotated</key>
        <${rotation ? 'true' : 'false'}/>
        <key>sourceColorRect</key>
        <string>${frame}</string>
        <key>sourceSize</key>
        <string>${sourceSize}</string>
        </dict>`
        }).join('\n      ')}
    </dict>
    <key>metadata</key>
    <dict>
        <key>format</key>
        <integer>2</integer>
        <key>pixelFormat</key>
        <string>RGBA8888</string>
        <key>premultiplyAlpha</key>
        <false/>
        <key>realTextureFileName</key>
        <string>texture.png</string>
        <key>size</key>
        <string>{${size.width},${size.height}}</string>
        <key>textureFileName</key>
        <string>texture</string>
    </dict>
    </dict>
</plist>
        `
        }

        if (format === "Phaser 3") {
            const output = {
                textures: [
                    {
                        image: "texture",
                        format: "RGBA8888",
                        size: {
                            w: size.width,
                            h: size.height
                        },
                        scale: 1,
                        frames: data.map(cur => {
                            const { pos, width, height, rotation, anchorPoint } = cur
                            const frame = { x: pos.x, y: pos.y, w: width, h: height }
                            return {
                                pivot: {
                                    x: anchorPoint.x / width,
                                    y: anchorPoint.y / height
                                },
                                filename: cur.name,
                                rotated: !!rotation,
                                trimmed: false,
                                sourceSize: {
                                    w: width,
                                    h: height
                                },
                                spriteSourceSize: {
                                    x: 0,
                                    y: 0,
                                    w: width,
                                    h: height
                                },
                                frame: frame
                            }
                        })
                    }
                ]
            }
            return JSON.stringify(output)
        }

        if (format === "Unreal Engine") {
            const frames = data.reduce((result, cur) => {
                const { pos, width, height, name, rotation, anchorPoint } = cur;
                const frame = { x: pos.x, y: pos.y, w: width, h: height };
                const pivotX = anchorPoint ? anchorPoint.x / width: 0.5
                const pivotY = anchorPoint ? anchorPoint.y / height: 0.5
                result[name] = {
                    frame: frame,
                    rotated: !!rotation,
                    trimmed: false,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: width,
                        h: height
                    },
                    sourceSize: {
                        w: width,
                        h: height
                    },
                    pivot: {
                        x: pivotX,
                        y: pivotY
                    }
                }
                return result
            }, {})
        
            return JSON.stringify({
                frames: frames,
                meta: {
                    image: outputName,
                    format: "RGBA8888",
                    size: {
                        w: size.width,
                        h: size.height
                    },
                    scale: 1,
                    target: "paper2d"
                }
            })
        }

        if (format === "XML") {
            return [
                '<?xml version="1.0" encoding="UTF-8"?>',
                `<TextureAtlas imagePath="${outputName}" width="${size.width}" height="${size.height}" scale="1" format="RGBA8888">`,
                ...data.map(({ name, pos, anchorPoint, rotation=0, width, height }) => {
                    const pivotX = anchorPoint ? anchorPoint.x / width: 0.5
                    const pivotY = anchorPoint ? anchorPoint.y / height: 0.5
                    return `<sprite n="${name}" x="${pos.x}" y="${pos.y}" w="${width}" h="${height}" r="${rotation}" pX="${pivotX}" pY="${pivotY}" />`
                }),
                `</TextureAtlas>`
            ].join("\n")
        }

    }
}

texAtlas.init()

export default texAtlas