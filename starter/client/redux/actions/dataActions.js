import axios from "axios";

import { GET_ERRORS, GET_DATA } from "./actionTypes";
//import setAuthToken from "../setAuthToken";
//import jwt_decode from "jwt-decode";

export const getData = () => dispatch => {
  axios
    .get("/api/data/getData")
    .then(res => {
      //console.log("About to dispatch GET_DATA!!!", res.data);
      dispatch({
        type: GET_DATA,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
