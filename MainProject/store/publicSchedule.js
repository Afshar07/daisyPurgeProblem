export const state = () => ({
  classType: null,
  classQuantity: null
});

export const mutations = {
  setClassType(state, classType) {
    state.classType = classType;
  },
  setClassQuantity(state, classQuantity) {
    state.classQuantity = classQuantity;
  }
};

export const actions = {
  setClassType(context, classType) {
    context.commit("setClassType", classType);
  },
  setClassQuantity(context, classQuantity) {
    context.commit("setClassQuantity", classQuantity);
  }
};

export const getters = {
  getClassType(state) {
    return state.classType;
  },
  getClassQuantity(state) {
    return state.classQuantity;
  }
};
