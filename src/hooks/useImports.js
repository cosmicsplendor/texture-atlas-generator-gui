import { useCallback, useReducer } from "react"
import * as importAxnTypes from "../constants/actionTypes/imports"
import { v4 } from "uuid"

export default () => {
    const [ imports, setImports ] = useReducer((prevImports, action) => {
        const { type, payload } = action
        switch(type) {
            case importAxnTypes.add:
                const newImport = {
                    id: v4(),
                    ...payload,
                    name: payload.name.replace(/\..+/, "")
                }
                return [ newImport, ...prevImports ]
            case importAxnTypes.remove:
                return prevImports.filter(({ id }) => id !== payload.id)
            case importAxnTypes.clear:
                return []
        }
    }, [])

    const add = useCallback(item => {
        setImports({ type: importAxnTypes.add, payload: item })
    }, [])
    
    const remove = useCallback(item => {
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