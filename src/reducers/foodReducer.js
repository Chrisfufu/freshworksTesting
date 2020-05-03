export default function reducer(state={
    foods: [],
    foodsFetched: [],
    posting: false,
    posted: false,
    fetching: false,
    fetched: false,
    error: null,
    fetchError:null,
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
      case "FETCH_FOODS": {
        return {...state, fetching: true}
      }
      case "FETCH_FOODS_FULFILLED": {
        return {...state, fetching: false, foodsFetched: action.payload}
      }
      case "FETCH_FOODS_REJECTED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          fetchError: action.payload,
        }
      }
      default:{
        return{
          ...state
        }
      }

    }
}
