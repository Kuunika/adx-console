import { FETCH_MIGRATION,ADD_HISTORY } from "../actions/types";

const initialState = {
  migration: [],
  error:"",
  // metaData: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_HISTORY:
        return {
          ...state,
          migration: action.payload
        };
    // case FETCH_META_DATA:
    //     return {
    //       ...state,
    //       metaData: action.payload
    //     }
    case FETCH_MIGRATION:
      if(action.payload.service){
        return {
          ...state,
          migration: [...state.migration,action.payload]
        };
      }
      return {
        ...state,
        error: "Invalid Migration UUID"
      };
    default:
      return state;
  }
}
