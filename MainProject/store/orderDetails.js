export const state = () => ({
  pro_id: null,
  top_category_id: null,
  execution_method: null,
  session_type: null,
  description: null,
  session_start_times: null,
  order: null,
});
export const mutations = {
  setProId(state, proId) {
    state.pro_id = proId;
  },
  setTopCategoryId(state, topCatId) {
    state.top_category_id = topCatId;
  },
  setExecutionMethod(state, execMethod) {
    state.execution_method = execMethod;
  },
  setSessionType(state, sessionType) {
    state.session_type = sessionType;
  },
  setDescription(state, description) {
    if (description) {
      state.description = description;
    }
  },
  setAddress(state, address) {
    state.address = address;
  },
  setSessionStartTimes(state, sessionStartTimes) {
    state.session_start_times = sessionStartTimes;
  },
  setOrder(state, order) {
    state.order = order;
  },
};
export const actions = {
  setProId(context, payload) {
    context.commit("setProId", payload);
  },
  setTopCategoryId(context, payload) {
    context.commit("setTopCategoryId", payload);
  },
  setExecutionMethod(context, payload) {
    context.commit("setExecutionMethod", payload);
  },
  setSessionType(context, payload) {
    context.commit("setSessionType", payload);
  },
  setDescription(context, payload) {
    context.commit("setDescription", payload);
  },
  setAddress(context, payload) {
    context.commit("setAddress", payload);
  },
  setSessionStartTimes(context, payload) {
    context.commit("setSessionStartTimes", payload);
  },
  setOrder(context, payload) {
    context.commit("setOrder", payload);
  },
};

export const getters = {
  getPayload(state) {
    return {
      pro_id: state.pro_id,
      top_category_id: state.top_category_id,
      execution_method: state.execution_method,
      session_type: state.session_type,
      description: state.description,
      session_start_times: state.session_start_times,
      address: state.address,
    };
  },
  getProId(state) {
    return state.pro_id;
  },
  getTopCategoryId(state) {
    return state.top_category_id;
  },
  getExecutionMethod(state) {
    return state.execution_method;
  },
  getSessionType(state) {
    return state.session_type;
  },
  getDescription(state) {
    return state.description;
  },
  getAddress(state) {
    return state.address;
  },
  getSessionStartTimes(state) {
    return state.session_start_times;
  },
  getOrder(state) {
    return state.order;
  },
};
