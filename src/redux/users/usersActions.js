import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./usersTypes";

import axios from "axios";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (products) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: products,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = (findUsers) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get(
        `https://api.github.com/search/users?q=${findUsers}in:login type:user"`,
        {
          mode: "cors",
          header: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        // response.data is the users
        const users = response.data;
        console.log(users);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};
