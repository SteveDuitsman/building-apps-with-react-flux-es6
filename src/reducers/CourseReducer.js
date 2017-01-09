import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      // spread operator
      return [...state, 
        Object.assign({}, action.course) // create a deep copy of the course passed in via the action
      ];
    default:
      return state;
  }
}