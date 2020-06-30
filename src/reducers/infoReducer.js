export default function reducer(state={
    info: [],
    posting: false,
    posted: false,
    error: null,
    allInfo:[],
    fetching: false,
    fetched: false,
    fetchError:null,
    refreshing: false,
    refreshed: false,
    refreshError: null,
    refresh: null,
    update:null,
    updating: false,
    updated: false,
    updateError: null
  }, action) {

    switch (action.type) {
      // adding information
      case "ADD_INFO": {
        return {...state, posting: true}
      }
      // there is an error when adding information
      case "ADD_INFO_REJECTED": {
        return {
          ...state, 
          posting: false, 
          info: [],
          error: action.payload
        }
      }
      // successfully adding information
      case "ADD_INFO_FULFILLED": {
        return {
          ...state,
          posting: false,
          posted: true,
          error: null,
          info: action.payload,
        }
      }
      case "FETCH_KEYS": {
        return {...state, fetching: true}
      }
      // fetch method success
      case "FETCH_KEYS_FULFILLED": {
        return {...state, fetching: false, allInfo: action.payload}
      }
      // there is an error when fetching all foods
      case "FETCH_KEYS_REJECTED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          fetchError: action.payload,
        }
      }
      case "REFRESH_KEYS": {
        return {...state, refreshing: true}
      }
      // fetch method success
      case "REFRESH_KEYS_FULFILLED": {
        return {...state, fetching: false, refreshed: true, refresh: action.payload, refreshError: null}
      }
      // there is an error when fetching all foods
      case "REFRESH_KEYS_REJECTED": {
        return {
          ...state,
          refreshing: false,
          refreshed: false,
          refreshError: action.payload,
        }
      }
      case "UPDATE_DESCRIPTION": {
        return {...state, updating: true}
      }
      // fetch method success
      case "UPDATE_DESCRIPTION_FULFILLED": {
        return {...state, updating: false, updated: true, update: action.payload, updateError: null}
      }
      // there is an error when fetching all foods
      case "UPDATE_DESCRIPTION_REJECTED": {
        return {
          ...state,
          updating: false,
          updated: false,
          updateError: action.payload,
        }
      }
      default:{
        return{
          ...state
        }
      }

    }
}
