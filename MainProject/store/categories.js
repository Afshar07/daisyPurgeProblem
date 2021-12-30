export const state = () => ({
  categoriesList: null,
  inPersonCategoriesList: null
});

export const mutations = {
  setCategoriesList(state, payload) {
    state.categoriesList = payload;
  },
  setInPersonCategoriesList(state, payload) {
    state.inPersonCategoriesList = payload;
  }
};

export const actions = {
  setCategoriesList(context, payload) {
    context.commit("setCategoriesList", payload);
  },
  setInPersonCategoriesList(context, payload) {
    context.commit("setinPersonCategoriesList", payload);
  }
};

export const getters = {
  getCategoriesList(state) {
    return state.categoriesList;
  },
  getInPersonCategoriesList(state) {
    return state.inPersonCategoriesList;
  }
};
