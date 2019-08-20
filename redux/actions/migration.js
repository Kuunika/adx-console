import { FETCH_MIGRATION ,ADD_HISTORY} from "./types";

export const getMigrationData = data => {
  return {
    type: FETCH_MIGRATION,
    payload: data
  };
};

export const addHistory = data => {
  return {
    type: ADD_HISTORY,
    payload: data
  };
};

// export const getMetaData = data => {
//   return {
//     type: FETCH_META_DATA,
//     payload: data
//   };
// };