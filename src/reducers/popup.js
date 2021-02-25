let initialState = null;

const popup = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_POPUP": {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default popup;
