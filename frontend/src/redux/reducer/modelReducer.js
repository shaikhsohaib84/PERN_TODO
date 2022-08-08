import { ActionType } from "../constant/actionType";

export const modelReducer = (state = [], obj) => {
    const { formName, payload, type } = obj;
    switch(type){
        case ActionType?.SET_MODAL: return { ...state, [formName]: payload };
        default: return state
    }
}