import { ActionTypes } from "../constants/index";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

let isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));

export default function auth(
  state = {
    isFetching: false,
    isAuthenticated: isAuthenticated ? true : false,
    approvedExpList: [],
    isPwdCreated: false
  },
  action
) {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ""
      });
    case ActionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      });
    case ActionTypes.PWD_CREATE_SUCCESS:
      return Object.assign({}, state, {
        isPwdCreated: true
      });
    default:
      return state;
  }
}
