import { FETCH_MIGRATION } from "../actions/types";

const initialState = {
  migration: {},
  error:""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MIGRATION:
      if(action.payload.service){
        return {
          ...state,
          migration: action.payload
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