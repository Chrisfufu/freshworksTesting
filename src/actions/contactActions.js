import axios from "axios";
import { URL_PREFIX } from './utils';

export function fetchContacts() {
  return function(dispatch) {
    dispatch({type: "FETCH_CONTACTS"});

    axios.get(URL_PREFIX + "/api/view/")
      .then((response) => {
        dispatch({type: "FETCH_CONTACTS_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_CONTACTS_REJECTED", payload: err})
      })
  }
}
