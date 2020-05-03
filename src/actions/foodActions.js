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

export function fetchFood() {
  return function(dispatch) {
    dispatch({type: "FETCH_FOODS"});
    axios(URL_PREFIX + "/api/foods/all/", {
      method: "get"
    })
    .then((response) => {
      dispatch({type: "FETCH_FOODS_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_FOODS_REJECTED", payload: err})
    })
  }
}
