export default (axios, resources) => ({
  async activeCities(searchQuery, pagination, category_id) {
    const response = await axios.get(resources, {
      params: {
        search: searchQuery,
        paginate: pagination,
        category_id,
      },
    });
    return response.data;
  },
  async newPage(urlData) {
    const response = await axios.get(urlData);
    return response.data;
  },
});
