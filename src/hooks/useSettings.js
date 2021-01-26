import { useState, useReducer, useCallback, useMemo } from "react"

export const sortingFns = [
    "max-side",
    "perimeter",
    "area",
    "diagonal",
    "width",
    "height",
]

export const metaFormats = [
    "Hash",
    "Array"
]

const initialSettings = {
    sortingFn: sortingFns[0],
    metaFormat: metaFormats[0],
    margin: {
        x: 0,
        y: 0
    },
    rotationEnabled: true
}

export default () => {
    const [ sortingFn, setSortingFn ] = useState(initialSettings.sortingFn)
    const [ metaFormat, setMetaFormat ] = useState(initialSettings.metaFormat)
    const [ rotationEnabled, setRotationEnabled ] = useState(initialSettings.rotationEnabled)
    const [ margin, updateMargin ] = useReducer((prevMargin, update) => {
        return { ...prevMargin, ...update }
    }, initialSettings.margin)

    const updateSettings = useCallback(({ sortingFn, metaFormat, rotationEnabled, margin }) => {
        if (!!sortingFn) {
            return setSortingFn(sortingFn)
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
        return { sortingFn, metaFormat, rotationEnabled, margin }
    }, [ sortingFn, metaFormat, rotationEnabled, margin])

    return [
        settings,
        updateSettings
    ]
}

