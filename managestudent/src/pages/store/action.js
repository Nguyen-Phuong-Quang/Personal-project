import { SET_TABLE_INPUT, ADD_INFO, DELETE_INFO, EDIT_INFO, SET_SEARCH_INPUT, SEARCH_INFO } from "./constants";

export const setTableInput  = payload => ({
    type: SET_TABLE_INPUT,
    payload /* Object */
})

export const addInfo = payload => ({
    type: ADD_INFO,
    payload /* Object */
})

export const deleteInfo = payload => ({
    type: DELETE_INFO,
    payload /* index of student */
})

export const editInfo = (payload, index) => ({
    type: EDIT_INFO,
    payload,
    index 
})

export const setSearchInput  = payload => ({
    type: SET_SEARCH_INPUT,
    payload /* Object */
})

export const searchInfo  = payload => ({
    type: SEARCH_INFO,
    payload /* Object */
})


