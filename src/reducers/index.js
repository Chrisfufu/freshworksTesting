import { combineReducers } from "redux"

import food from "./foodReducer"
import info from "./infoReducer"

export default combineReducers({
  food,
  info
})
