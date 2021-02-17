const sortingFns = {
    "max-side": (a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height),
    area: (a, b) => b.width * b.height - a.width * a.height ,
    diagonal: (a, b) => (b.width * b.width + b.height * b.height) - (a.width * a.width + a.height * a.height),
    perimeter: (a, b) => (b.width + b.height) - (a.width + a.height),
    width: (a, b) => b.width - a.width,
    height: (a, b) => b.height - a.height
}

const calcAtlasHeight = rootNode => { // tail call optimized
    if (!rootNode.down) {
        return rootNode.y
    }
    return calcAtlasHeight(rootNode.down)
}

export default function pack({ rects: rawRects, sortingFn, rotationEnabled, margin }) {
    if (rawRects.length === 0) {
        return { packedRects: [], bound: { width: 0, height: 0 } }
    }

    const occupyNode = (node, { w, h }) => {
        const { x: marginX, y: marginY } =  margin
        const tw = w + 2 * marginX, th = h + 2 * marginY
        node.right = { x: node.x + tw, y: node.y, width: node.width - tw, height: th }
        node.down = { x: node.x, y: node.y + th, width: node.width, height: node.height - th}
        node.occupied = true
        return { pos: { x: node.x + marginX, y: node.y + marginY} }
    }
    
    const findPos = (node, { width: w, height: h }) => {
        if (node.occupied) {
            return findPos(node.right, { width: w, height: h }) || findPos(node.down, { width: w, height: h })
        }
        const tw = w + 2 * margin.x, th = h + 2 * margin.y
        return (node.width >= tw && node.height >= th) ? occupyNode(node, { w, h }):
               (node.width >= th && node.height >= tw && rotationEnabled) ? { ...occupyNode(node, { h: w, w: h }), rotation: 90, pivot: { x: 0, y: -h } }:
               null
    }

    const rects = rawRects.slice().sort(sortingFns[sortingFn])

    const totalArea = rects.reduce((acc, cur) => acc + (cur.width + margin.x) * (cur.height + margin.y), 0)
    const containerWidth = Math.max(rects[0].width + margin.x, rects[0].height + margin.y, Math.round(Math.sqrt(totalArea * 1.1)))
    const rootNode = { x: 0, y: 0, width: containerWidth, height: Infinity } // root node of the tree
    const packedRects = rects.map(rect => ({ ...rect, ...findPos(rootNode, rect) }))
    const containerHeight = calcAtlasHeight(rootNode, margin.y)

    return {
        packedRects,
        bound: { width: containerWidth, height: containerHeight }
    }
}