import lib from "max-rects-bin-pack"
const MaxRects = lib.MaxRects
const calcAtlasBound = (rects, margin=0) => {
    const bounds = rects.reduce((bounds, rect) => {
        return {
            width: Math.max(rect.pos.x + rect.width, bounds.width),
            height: Math.max(rect.pos.y + rect.height, bounds.height)
        }
    }, { width: 0, height: 0 })
    bounds.width += margin
    bounds.height += margin
    return bounds
}
export default function pack({ rects: rawRects, margin }) {
    
    if (rawRects.length === 0) {
        return { packedRects: [], bound: { width: 0, height: 0 } }
    }
    const MARGIN = Math.max(margin.x, margin.y)
    const mr = new MaxRects(MARGIN, 0, false)
    return new Promise((resolve, reject) => {
        mr.calc(rawRects, (error, results) => {
            if (error) return reject(error)
            const packedRects = results.arrangment.map(rect => {
                const { left, top, id } = rect
                const texture = rawRects.find(rr => rr.id === id)
                return Object.assign(texture, { pos: { x: left, y: top } })
            })
            resolve({ packedRects, bound: calcAtlasBound(packedRects, MARGIN) })
        })
    })
}