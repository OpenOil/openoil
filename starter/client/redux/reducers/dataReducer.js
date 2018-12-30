import { GET_DATA } from "../actions/actionTypes";
import isEmpty from "../validation/is-empty";

const initialState = {
  rows: []
};

// Action.payload is the array of data rows
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        rows: action.payload
      };
    default:
      return state;
  }
}
