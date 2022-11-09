import {
  FETCH_SINGLE_USER_REQUEST,
  FETCH_SINGLE_USER_SUCCESS,
  FETCH_SINGLE_USER_FAILURE,
} from "./singleUserTypes";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_SINGLE_USER_SUCCESS: {
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    }

    case FETCH_SINGLE_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default singleUserReducer;
