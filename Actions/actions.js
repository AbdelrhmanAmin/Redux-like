import store from "../Store";

// An example
const add = (data) => {
  store.dispatch("ADD_ITEM", data);
};

const remove = (index) => {
  store.dispatch("REMOVE_ITEM", index);
};

export default {
  add,
  remove,
};
