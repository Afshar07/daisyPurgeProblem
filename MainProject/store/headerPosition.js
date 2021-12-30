export const state = () => ({
  headerPosition: "fixed"
});

export const mutations = {
  setHeaderPosition(state, position) {
    state.headerPosition = position;
  }
};

export const actions = {
  setHeaderPosition(context, position) {
    context.commit("setHeaderPosition", position);
  }
};

export const getters = {
  getHeaderPosition(state) {
    return state.headerPosition;
  }
};
