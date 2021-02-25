let initialState = [];

const photos = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PHOTOS": {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default photos;
