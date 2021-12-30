export const state = () => ({
  isModalActive: false,
  isMenuOpen: false
});
export const mutations = {
  setIsModalActive(state, payload) {
    state.isModalActive = payload;
  },
  setIsMenuOpen(state, payload) {
    state.isMenuOpen = payload;
  }
};
export const actions = {
  setIsModalActive(context, payload) {
    context.commit("setIsModalActive", payload);
  },
  setIsMenuOpen(context, payload) {
    context.commit("setIsMenuOpen", payload);
  }
};

export const getters = {
  getIsModalActive(state) {
    return state.isModalActive;
  },
  getIsMenuOpen(state) {
    return state.isMenuOpen;
  }
};
