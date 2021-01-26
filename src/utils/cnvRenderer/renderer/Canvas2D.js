import * as types from "../entities/core/types"

class Canvas2DRenderer {
    constructor({ canvasId, scene }) {
        this.canvas = document.querySelector(`#${canvasId}`)
        this.scene = scene
        this.ctx = this.canvas.getContext("2d")
    }
    render(node) {
        const { ctx } = this
        const { type, pos, scale, pivot, rotation, anchor } = node
        
        ctx.translate(pos.x, pos.y)
        ctx.translate(anchor.x, anchor.y)
        ctx.rotate(Math.PI * rotation / 180)
        ctx.translate(-anchor.x, -anchor.y)
        ctx.translate(pivot.x, pivot.y)
        ctx.scale(scale.x, scale.y)
        
        switch(type) {
            case types.texture:
                ctx.drawImage(node.img, 0, 0)
            break
            case types.rect:
                ctx.fillStyle = node.fill
                ctx.fillRect(0, 0, node.width, node.height)
                if (node.stroke) {
                    ctx.strokeStyle = node.stroke
                    ctx.strokeRect(0, 0, node.width, node.height)
                }
            break
            case types.text:

            break
            case types.sprite:

            break
        }
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    renderRecursively(node) {
        node = node || this.scene
        this.ctx.save()
        this.render(node)
        for (const childNode of node.children) {
            this.renderRecursively(childNode)
        }
        this.ctx.restore()
    }
}

export default Canvas2DRenderer