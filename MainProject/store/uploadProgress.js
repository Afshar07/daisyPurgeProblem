export const state = () => ({
  uploadProgress: 0
});

export const mutations = {
  setUploadProgress(state, progress) {
    state.uploadProgress = progress;
  }
};

export const actions = {
  setUploadProgress(context, progress) {
    context.commit("setUploadProgress", progress);
  }
};

export const getters = {
  getUploadProgress(state) {
    return state.uploadProgress;
  }
};
