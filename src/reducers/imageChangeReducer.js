import constants from './../constants';
const { initialState, types } = constants;

const imageChangeReducer = (state = initialState.image , action) => {
  let newImage;
  let newImageStateSlice;
  switch (action.type) {

  case types.CHANGE_IMAGE: {
    console.log('CHANGING IMAGE! ');
    newImageStateSlice = Object.assign({}, state.image, {
      url: action.url
    });
    return newImageStateSlice;
  }
  default:
    return state;
  }
};

export default imageChangeReducer;
