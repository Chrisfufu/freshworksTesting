export default function reducer(state={
    info: [],
    posting: false,
    posted: false,
    error: null,
  }, action) {

    switch (action.type) {
      // adding information
      case "ADD_INFO": {
        return {...state, posting: true}
      }
      // there is an error when adding information
      case "ADD_INFO_REJECTED": {
        return {...state, posting: false, error: action.payload}
      }
      // successfully adding information
      case "ADD_INFO_FULFILLED": {
        return {
          ...state,
          posting: false,
          posted: true,
          info: action.payload,
        }
      }
      default:{
        return{
          ...state
        }
      }

    }
}
