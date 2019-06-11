import { FETCH_MIGRATION } from "../actions/types";

const initialState = {
  migration: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MIGRATION:
      return {
        ...state,
        migration: action.payload
      };
    default:
      return state;
  }
}
