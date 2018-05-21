import * as types from "./mutation-types"

const findIndex = (list, items) =>
    list.findIndex(item => item.id === items.id)

findIndex(types)
