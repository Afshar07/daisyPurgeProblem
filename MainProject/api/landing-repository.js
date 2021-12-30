import qs from "qs";
export default (context, resources) => ({
  async getLanding(id) {
    const response = await context.$axios.get(`${resources}/${id}`);
    return response.data;
  },
  async getPros(top_category_id, filters, category_id) {
    let qParams = {
      filters: { ...filters },
    };
    if (top_category_id) {
      qParams.filters.top_category_id = top_category_id;
    }
    if (category_id) {
      qParams.category_id = category_id;
    }

    const response = await context.$axios.get(resources, {
      params: qParams,
      paramsSerializer: (params) => qs.stringify(params, { encode: false }),
    });
    return response.data;
  },
  async getTimesheet(id, from, to) {
    const response = await context.$axios.get(`${resources}/${id}/schedule`, {
      params: {
        from,
        to,
      },
    });
    return response.data;
  },
  async getMorePros(address, top_category_id) {
    const response = await context.$axios.get(address, {
      params: {
        top_category_id,
      },
    });
    return response.data;
  },
  async getChildCategories(search, top_category_id, city_id) {
    const response = await context.$axios.get(resources, {
      params: {
        search,
        top_category_id,
        city_id,
      },
    });
    return response.data;
  },
});
