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
      // adding food.
      case "ADD_FOOD": {
        return {...state, posting: true}
      }
      // rejected means that it has an error
      case "ADD_FOOD_REJECTED": {
        return {...state, posting: false, error: action.payload}
      }
      // successfully posted the data to database.
      case "ADD_FOOD_FULFILLED": {
        return {
          ...state,
          posting: false,
          posted: true,
          foods: action.payload,
        }
      }
      // fetch all foods from database
      case "FETCH_FOODS": {
        return {...state, fetching: true}
      }
      // fetch method success
      case "FETCH_FOODS_FULFILLED": {
        return {...state, fetching: false, foodsFetched: action.payload}
      }
      // there is an error when fetching all foods
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
