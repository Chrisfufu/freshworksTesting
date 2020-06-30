import axios from "axios";
import { URL_PREFIX } from './utils';

export function addInfo(data) {
  
  var info = {
    "description": data.description,
    "expiryTime": new Date(data.expiryTime),
    "name": data.name
  }
  // post method, create a feeding information
  return function(dispatch) {
    dispatch({type: "ADD_INFO"});
    axios(URL_PREFIX + "/api/info/create/", {
      method: "post",
      data: info,
    })
    .then((response) => {
      dispatch({type: "ADD_INFO_FULFILLED", payload: response.data});
    })
    .catch((err) => {
      dispatch({type: "ADD_INFO_REJECTED", payload: err})
    })
  }
}

export function fetchKeys() {
  // get method,
  // fetch all food objects
  return function(dispatch) {
    dispatch({type: "FETCH_KEYS"});
    axios(URL_PREFIX + "/api/info/all/", {
      method: "get"
    })
    .then((response) => {
      dispatch({type: "FETCH_KEYS_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_KEYS_REJECTED", payload: err})
    })
  }
}


export function refreshKeys(data) {
  // put method,
  // fetch all food objects
  return function(dispatch) {
    dispatch({type: "REFRESH_KEYS"});
    axios(URL_PREFIX + "/api/info/refresh/" + data +"/", {
      method: "put"
    })
    .then((response) => {
      dispatch({type: "REFRESH_KEYS_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "REFRESH_KEYS_REJECTED", payload: err})
    })
  }
}


export function editDescription(data) {
  // put method,
  // fetch all food objects
  return function(dispatch) {
    dispatch({type: "UPDATE_DESCRIPTION"});
    axios(URL_PREFIX + "/api/info/update/" + data.key +"/", {
      method: "put",
      data: data
    })
    .then((response) => {
      dispatch({type: "UPDATE_DESCRIPTION_FULFILLED", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "UPDATE_DESCRIPTION_REJECTED", payload: err})
    })
  }
}