export default function reducer(state={
    foods: [],
    posting: false,
    posted: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "ADD_FOOD": {
        return {...state, posting: true}
      }
      case "ADD_FOOD_REJECTED": {
        return {...state, posting: false, error: action.payload}
      }
      case "ADD_FOOD_FULFILLED": {
        return {
          ...state,
          posting: false,
          posted: true,
          foods: action.payload,
        }
      }
      default:{
        return{
          ...state
        }
      }

    }
}
