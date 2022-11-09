import {
  FETCH_SINGLE_USER_REQUEST,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAILURE,
} from "./singleUserTypes";

import axios from "axios";

export const fetchSingleUserRequest = () => {
  return {
    type: FETCH_SINGLE_USER_REQUEST,
  };
};

export const fetchSingleUserSuccess = (products) => {
  return {
    type: FETCH_SINGLE_USER_SUCCESS,
    payload: products,
  };
};

export const fetchSingleUserFailure = (error) => {
  return {
    type: FETCH_SINGLE_USER_FAILURE,
    payload: error,
  };
};

export const fetchSingleUser = (singleUser) => {
  return (dispatch) => {
    dispatch(fetchSingleUserRequest());
    axios
      .get(`https://api.github.com/users/${singleUser}`, {
        mode: "cors",
        header: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      })
      .then((response) => {
        // response.data is the users
        const user = response.data;
        console.log(user);
        dispatch(fetchSingleUserSuccess(user));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchSingleUserFailure(error.message));
      });
  };
};
