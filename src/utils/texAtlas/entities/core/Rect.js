import Node from "../Node"
import { rect } from "./types"

class Rect extends Node {
    constructor({ width, height, fill = "#000000", stroke, ...nodeProps }) {
        super({ ...nodeProps })
        this.width = width
        this.height = height
        this.fill = fill
        this.stroke = stroke
        this.type = rect
    }
}

export default Rect