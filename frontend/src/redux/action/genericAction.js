import { ActionType } from "../constant/actionType"

export const setGeneric = (obj={}) => {
    return {
        type: ActionType?.SET_GENERIC,
        payload: obj
    }
}