import constants from './../constants';
const { initialState, types } = constants;

const imageChangeReducer = (state = initialState.image, action) => {

  switch (action.type) {
  default:
    return state;
  }
};

export default imageChangeReducer;
