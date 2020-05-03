export default function reducer(state={
    info: [],
    posting: false,
    posted: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "ADD_INFO": {
        return {...state, posting: true}
      }
      case "ADD_INFO_REJECTED": {
        return {...state, posting: false, error: action.payload}
      }
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
