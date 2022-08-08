import { ActionType } from "../constant/actionType"

export const genericReducer = (state={}, action) => {
    const { type, payload } = action
    switch(type){
        case ActionType?.SET_GENERIC:
            return { ...state, ...payload }
            
        default: return state
    }
}