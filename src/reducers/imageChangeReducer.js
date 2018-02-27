import constants from './../constants';
const { initialState, types } = constants;

const imageChangeReducer = (state = initialState.image, action) => {

  switch (action.type) {
  case types.CHANGE_IMAGE:
    return action.url;
  default:
    return state;
  }
};

export default imageChangeReducer;
