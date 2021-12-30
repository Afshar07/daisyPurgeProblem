export default (context, resources) => ({
  async getPost(name) {
    const response = await context.$axios.get(`${resources}/${name}`);
    return response;
  },
});
