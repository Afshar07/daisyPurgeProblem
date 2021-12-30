import qs from "qs";
export default (axios, resources) => ({
  async getCategories(cityId, searchQuery) {
    const response = await axios.get(resources, {
      params: {
        search: searchQuery,
        city_id: cityId
      }
    });
    return response.data;
  },
  async getInternationalTests() {
    const response = await axios.get(resources, {
      params: {
        nested: 0,
        filters: { type: "test" }
      },
      paramsSerializer: params => qs.stringify(params, { encode: false })
    });
    return response;
  }
});
