import { FETCH_SINGLE_USER, FETCH_SINGLE_USER_REPOS } from "./singleUserTypes";

const initialUserState = {
  user: [],
  repos: [],
};

const singleUserReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case FETCH_SINGLE_USER_REPOS: {
      return {
        ...state,
        repos: action.payload,
      };
    }

    default:
      return state;
  }
};

export default singleUserReducer;
