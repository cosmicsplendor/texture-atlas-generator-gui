import Vec2 from "../math/Vec2"

class Node {
    constructor({ pos = { x: 0, y: 0}, rotation = 0, scale = { x: 1, y: 1 },  anchor = { x: 0, y: 0 }, pivot = { x: 0, y: 0 } } = {}) {
        this.children = []
        this.pos = new Vec2(pos)
        this.scale = new Vec2(scale)
        this.rotation = rotation
        this.anchor = new Vec2(anchor)
        this.pivot = new Vec2(pivot)
    }
    static clone(node) {
        
    }   
    add(childNode) {
        this.children.push(childNode)
        return this
    }
    remove(childNode) {
        this.children.filter(n => n !== childNode)
    }
    updateRecursively() {
        this.update && this.update()
        this.children.forEach(node => {
            node.updateRecursively()
        })
    }
}

export default Node