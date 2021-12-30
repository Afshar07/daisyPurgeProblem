export default (context, resources) => ({
  async getCustomerMe() {
    const response = await context.$axios.get(resources, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response.data;
  },
  async setCustomerDetails(payload) {
    const response = await context.$axios.post(resources, payload, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
  async getOtp(cellphone) {
    const response = await context.$axios.post(resources, {
      cellphone: cellphone,
    });
    return response;
  },
  async uploadAvatar(payload) {
    const response = await context.$axios.post(resources, payload, {
      onUploadProgress: (progressEvent) => {
        // send Upload progress to vuex for progress bars
        context.store.dispatch(
          "uploadProgress/setUploadProgress",
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    });
    return response;
  },
  async chargeWallet(price) {
    const response = await context.$axios.post(
      resources,
      {
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
        },
      }
    );
    return response;
  },
  async getTransactions(paginate = 10, search = null) {
    const response = await context.$axios.get(resources, {
      params: {
        paginate,
        search,
      },
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
  async changeTransactionPage(urlData) {
    const response = await context.$axios.get(urlData, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
  async getPendingOrders() {
    const response = await context.$axios.get(resources, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
  async getSessions(status, paginate) {
    const response = await context.$axios.get(resources, {
      params: {
        paginate,
        status: [...status],
      },
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
  async endSession(sessionId) {
    const response = await context.$axios.post(
      `${resources}/${sessionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
        },
      }
    );
    return response;
  },
  async changeOrdersPage(url, paginate) {
    const response = await context.$axios.get(url, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
  async setSessionTime(sessionId, session_start_time) {
    const response = await context.$axios.post(
      `${resources}/${sessionId}`,
      {
        session_start_time,
      },
      {
        headers: {
          Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
        },
      }
    );
    return response;
  },
  async reportSessionProblem(sessionId, problemDetails) {
    const response = await context.$axios.post(
      `${resources}/${sessionId}`,
      problemDetails,
      {
        headers: {
          Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
        },
      }
    );
    return response;
  },
  async getFavorites() {
    const response = await context.$axios.get(resources, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
  async addToFavroite(userId) {
    const response = await context.$axios.post(
      resources,
      {
        favorite_user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
        },
      }
    );
    return response;
  },
  async deleteFromFavorite(userId) {
    const response = await context.$axios.delete(`${resources}/${userId}`, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`,
      },
    });
    return response;
  },
});
