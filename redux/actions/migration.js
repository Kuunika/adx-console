import { FETCH_MIGRATION } from "./types";

export const getMigrationData = data => {
  return {
    type: FETCH_MIGRATION,
    payload: data
  };
};
