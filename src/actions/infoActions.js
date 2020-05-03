import axios from "axios";
import { URL_PREFIX } from './utils';

export function addInfo(data, startTime, endTime) {
  var foods = [];
  for (var i = 0; i < data.foodSelected.length; i++){
    foods.push({"foodId": data.foodSelected[i]})
  }
  var date1 = new Date(startTime.substring(0, 10));
  var date2 = new Date(endTime.substring(0, 10));
  var difference = date2.getTime() - date1.getTime();
  var differenceTime = (difference / (1000 * 3600 * 24)) + 1;
  var info = {
    "food": foods,
    "time": startTime,
    "location": data.location,
    "numberOfDucks": data.numberOfDucks,
    "repeatDays": differenceTime
  }
  // {
  //   "food": [
  //       {
  //           "foodId": 1
  //       },
  //       {
  //           "foodId": 2
  //       }
  //   ],
  //   "time": "2020-05-10T00:12:00-06:00",
  //   "location": "Edmonton",
  //   "numberOfDucks": 2,
  //   "repeatDays": 1
  // }
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
