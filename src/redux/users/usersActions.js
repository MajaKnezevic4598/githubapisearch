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
    let finnalUsers = [];

    dispatch(fetchUsersRequest());
    axios
      .get(
        `https://api.github.com/search/users?q=${findUsers}in:login+type:user&per_page=10`,
        {
          mode: "cors",
          header: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        let users = response.data.items;
        return users;
      })
      .then((users) => {
        users.forEach((user) => {
          axios
            .get(`https://api.github.com/users/${user.login}`)
            .then((res) => {
              finnalUsers.push({
                ...user,
                name: res.data.name,
                description: res.data.bio,
              });
              return finnalUsers;
            })
            .then((value) => {
              setTimeout(() => {
                dispatch(fetchUsersSuccess(finnalUsers));
              }, 1000);
            })
            .catch((error) => {
              dispatch(fetchUsersFailure(error.message));
            });
        });
      });
  };
};
