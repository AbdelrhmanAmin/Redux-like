const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.item];
    case "REMOVE_ITEM":
      return state.filter((item) => item !== action.item);
    default:
      return state;
  }
};

export default itemsReducer;