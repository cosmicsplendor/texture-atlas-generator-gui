import { useCallback, useReducer } from "react"
import * as importAxnTypes from "../actionTypes/imports"
import { v4 } from "uuid"

export default () => {
    const [ imports, setImports ] = useReducer((prevImports, action) => {
        const { type, payload } = action
        switch(type) {
            case importAxnTypes.add:
                const newImport = {
                    id: v4(),
                    ...payload
                }
                return [ newImport, ...prevImports ]
            break
            case importAxnTypes.remove:
                return prevImports.filter(({ id }) => id !== payload.id)
            break
            case importAxnTypes.clear:
                return []
            break
        }
    }, [])

    const add = useCallback(item => {
        setImports({ type: importAxnTypes.add, payload: item })
    }, [])
    
    const remove = useCallback(item => {
        console.log({ type: importAxnTypes.remove, payload: item })
        setImports({ type: importAxnTypes.remove, payload: item })
    }, [])

    const clear = useCallback(() => {
        setImports({ type: importAxnTypes.clear })
    }, [])

    return {
        imports,
        importAxns: {
            add,
            remove,
            clear
        }
    }
}