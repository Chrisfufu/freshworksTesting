import axios from "axios";
import { URL_PREFIX } from './utils';

export function addFood(data) {

  return function(dispatch) {
    dispatch({type: "ADD_FOOD"});
    axios(URL_PREFIX + "/api/foods/create/", {
      method: "post",
      data: data,
    })
    .then((response) => {
      dispatch({type: "ADD_FOOD_FULFILLED", payload: response.data});
    })
    .catch((err) => {
      dispatch({type: "ADD_FOOD_REJECTED", payload: err})
    })
  }
}
