import { FETCH_SINGLE_USER, FETCH_SINGLE_USER_REPOS } from "./singleUserTypes";

// import axios from "axios";

export const fetchSingleUser = (user) => {
  return {
    type: FETCH_SINGLE_USER,
    payload: user,
  };
};

export const fetchSingleUserRepos = (repos) => {
  return {
    type: FETCH_SINGLE_USER_REPOS,
    payload: repos,
  };
};
