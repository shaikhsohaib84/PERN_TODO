import { combineReducers }  from "redux"
import { genericReducer } from "./genericReducer"
import { modelReducer } from "./modelReducer"

const reducers = combineReducers({
    generic: genericReducer,
    model: modelReducer
})

export default reducers