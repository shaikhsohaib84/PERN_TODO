import { ActionType } from "../constant/actionType"

const setModel = (name='', data=[]) => {
    return {
        formName: name,
        type: ActionType?.SET_MODAL,
        payload: data
    }
}

export default setModel
