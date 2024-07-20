import { useState, useReducer, useCallback, useMemo } from "react"

export const metaFormats = [
    {
        name: "CSS Sprite",
        ext: "css"
    },
    {
        name: "Cocos 2D",
        ext: "plist"
    },
    {
        name: "Godot",
        ext: "tpsheet"
    },
    {
        name: "JSON Array",
        ext: "json"
    },
    {
        name: "JSON Hash",
        ext: "json"
    },
    {
        name: "Phaser 3",
        ext: "json"
    },
    {
        name: "PIXI",
        ext: "json"
    },
    {
        name: "Unity3D",
        ext: "tpsheet"
    },
    {
        name: "Unreal Engine",
        ext: "paper2dsprites"
    },
    {
        name: "XML",
        ext: "xml"
    }
]

export const algorithms = [
    "Max Rects",
    "BinaryTree Bin Packer"
]
const initialSettings = {
    metaFormat: "Phaser 3",
    margin: {
        x: 0,
        y: 0
    },
    rotationEnabled: false,
    algorithm: algorithms[1],
}

export default () => {
    const [ algorithm, setAlgorithm ] = useState(initialSettings.algorithm)
    const [ metaFormat, setMetaFormat ] = useState(initialSettings.metaFormat)
    const [ rotationEnabled, setRotationEnabled ] = useState(initialSettings.rotationEnabled)
    const [ margin, updateMargin ] = useReducer((prevMargin, update) => {
        return { ...prevMargin, ...update }
    }, initialSettings.margin)

    const updateSettings = useCallback(({ algorithm, metaFormat, rotationEnabled, margin }) => {
        if (!!algorithm) {
            return setAlgorithm(algorithm)
        }
        if (!!metaFormat) {
            return setMetaFormat(metaFormat)
        }
        if (typeof rotationEnabled !== "undefined" && typeof rotationEnabled !== "null") {
            return setRotationEnabled(rotationEnabled)
        }
        if (!!margin) {
            return updateMargin(margin)
        }
    }, [])

    const settings = useMemo(() => {
        return { algorithm, metaFormat, rotationEnabled, margin }
    }, [ algorithm, metaFormat, rotationEnabled, margin])

    return [
        settings,
        updateSettings
    ]
}

