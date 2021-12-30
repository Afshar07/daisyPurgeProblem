export const state = () => ({
  addingItems: [],
  removingItems: []
});

export const mutations = {
  pushAddingItems(state, payload) {
    if (!state.addingItems.includes(payload)) {
      state.addingItems.push(payload);
    }
  },
  clearAddingItems(state) {
    state.addingItems = [];
  },
  deleteAddingItems(state, payload) {
    state.addingItems = state.addingItems.filter(item => item != payload);
  },
  pushRemovingItems(state, payload) {
    if (!state.removingItems.includes(payload)) {
      state.removingItems.push(payload);
    }
  },
  clearRemovingItems(state) {
    state.removingItems = [];
  },
  deleteRemovingItems(state, payload) {
    state.removingItems = state.removingItems.filter(item => item != payload);
  }
};

export const actions = {
  pushAddingItems(context, payload) {
    context.commit("pushAddingItems", payload);
  },
  deleteAddingItems(context, payload) {
    context.commit("deleteAddingItems", payload);
  },
  clearAddingItems(context) {
    context.commit("clearAddingItems");
  },
  pushRemovingItems(context, payload) {
    context.commit("pushRemovingItems", payload);
  },
  deleteRemovingItems(context, payload) {
    context.commit("deleteRemovingItems", payload);
  },
  clearRemovingItems(context) {
    context.commit("clearRemovingItems");
  }
};

export const getters = {
  getAddingItems(state) {
    return state.addingItems;
  },
  getRemovingItems(state) {
    return state.removingItems;
  }
};
