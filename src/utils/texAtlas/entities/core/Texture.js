import Node from "../Node"
import { texture } from "./types"

export default class Texture extends Node {
    constructor({ imgUrl, ...nodeProps }) {
        super({ ...nodeProps })
        this.img = new Image()
        this.img.src = imgUrl
        this.type = texture
    }
}