import { FETCH_MIGRATION } from "./types";

export const getMigrationData = data => {
  console.log(data)
  return {
    type: FETCH_MIGRATION,
    payload: data
  };
};
