export default (context, resources) => ({
  async sendOrderRequest(payload) {
    const response = await context.$axios.post(resources, payload, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async getOrderDetails(orderId) {
    const response = await context.$axios.get(`${resources}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async sendPaymentRequest(payload) {
    const response = await context.$axios.post(resources, payload, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async checkPayment(Authority, Status) {
    const response = await context.$axios.get(resources, {
      params: {
        Authority,
        Status
      }
    });
    return response;
  }
});
