export const state = () => ({
  currentPage: null,
  links: null,
});

export const mutations = {
  setCurrentPage(state, payload) {
    state.currentPage = payload;
  },
  setLinks(state, payload) {
    state.links = payload;
  },
};

export const actions = {
  setCurrentPage(context, payload) {
    context.commit("setCurrentPage", payload);
  },
  setLinks(context, payload) {
    context.commit("setLinks", payload);
  },
};

export const getters = {
  getCurrentPage(state) {
    return state.currentPage;
  },
  getLinks(state) {
    return state.links;
  },
};
