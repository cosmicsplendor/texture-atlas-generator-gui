const occupyNode = (node, { w, h }) => {
    node.right = { x: node.x + w, y: node.y, width: node.width - w, height: h }
    node.down = { x: node.x, y: node.y + h, width: node.width, height: node.height - h}
    node.occupied = true
    return { pos: { x: node.x, y: node.y } }
}

const findPos = (node, { width: w, height: h }) => {
    if (node.occupied) {
        return findPos(node.right, { width: w, height: h }) || findPos(node.down, { width: w, height: h })
    }
    return (node.width >= w && node.height >= h) ? occupyNode(node, { w, h }):
           (node.width >= h && node.height >= w) ? { ...occupyNode(node, { h: w, w: h }), rotation: 90, pivot: { x: 0, y: -h } }:
           null
}

export default function pack(rawRects) {
    // const rects = rawRects.slice().sort((a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height))
    const rects = rawRects.slice().sort((a, b) => b.width * b.height - a.width * a.height )

    console.log({ rawRects })

    const totalArea = rects.reduce((acc, cur) => acc + cur.width * cur.height, 0)
    const containerWidth = Math.max(rects[0].width, rects[0].height, Math.round(Math.sqrt(totalArea * 1.1)))
    const rootNode = { x: 0, y: 0, width: containerWidth, height: Infinity } // root node of the tree

    return rects.map(rect => ({ ...rect, ...findPos(rootNode, rect) }))
}