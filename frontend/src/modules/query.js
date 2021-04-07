import { createStore } from 'redux'

export const QUERY_SAVE = "query/QUERY_SAVE"
export const QUERY_STORE = "query/QUERY_STORE"

export const query_save = (query) => {
    return {
        type: QUERY_SAVE,
        query: query
    }
}

const initState = {
    content: ''
}

const queryReducer = (state = initState, action) => {
    switch (action.type) {
        case QUERY_SAVE:
            return action.query
        default:
            return state
    }
}