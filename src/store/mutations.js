import * as types from "./mutation-types"

const mutations = {
    [types.SET_ACTIONS] (state, data) {
        state.data = data
    }
}

export default mutations
