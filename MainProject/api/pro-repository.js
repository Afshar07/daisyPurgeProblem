import qs from "qs";
export default (context, resources) => ({
  async getProData() {
    const response = await context.$axios.get(resources, {
      headers: { Authorization: `Bearer ${context.$auth.strategy.token.get()}` }
    });
    return response;
  },
  async getProvince(searchquery) {
    const response = await context.$axios.get(resources, {
      params: { search: searchquery, paginate: 31 }
    });
    return response;
  },
  async getCity(provinceId, searchquery, paginate) {
    const response = await context.$axios.get(resources, {
      params: {
        search: searchquery,
        province_id: provinceId,
        paginate: paginate
      }
    });
    return response;
  },
  async newPage(pageQuery, paginate, provinceId) {
    const response = await context.$axios.get(pageQuery, {
      params: { paginate: paginate, province_id: provinceId }
    });
    return response;
  },
  async profileUpdate(payload) {
    const response = await context.$axios.post(resources, payload, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async uploadAvatar(payload) {
    const response = await context.$axios.post(resources, payload, {
      onUploadProgress: progressEvent => {
        // send Upload progress to vuex for progress bars
        context.store.dispatch(
          "uploadProgress/setUploadProgress",
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      }
    });
    return response;
  },
  async getAcceptableLangs(search, nested, parent_id) {
    const response = await context.$axios.get(resources, {
      params: {
        search: search,
        nested: nested,
        parent_id: parent_id
      },
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async getSubCats(parent_id, filters) {
    const response = await context.$axios.get(resources, {
      params: {
        parent_id: parent_id,
        filters: { type: filters }
      },
      paramsSerializer: params => qs.stringify(params, { encode: false }),
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async SubmitTimesheet(payload) {
    const response = await context.$axios.post(
      resources,
      {
        add: payload.added,
        remove: payload.removed
      },
      {
        headers: {
          Authorization: `Bearer ${context.$auth.strategy.token.get()}`
        }
      }
    );
    return response;
  },
  async getTimesheet(id, fromTimestamp, toTimestamp) {
    const response = await context.$axios.get(`${resources}/${id}/schedule`, {
      params: {
        from: fromTimestamp,
        to: toTimestamp
      }
    });
    return response;
  },
  async sendTechnicalInfo(payload) {
    const response = context.$axios.post(
      resources,
      {
        about_me: payload.aboutMe,
        top_category_id: payload.topCatId,
        category_ids: payload.categoryIds,
        age_groups: payload.ageGroups,
        levels: payload.levels,
        pro_type: payload.type,
        other_language_skills: payload.otherLangIds
      },
      {
        headers: {
          Authorization: `Bearer ${context.$auth.strategy.token.get()}`
        }
      }
    );
    return response;
  },
  async uploadVideo(payload) {
    const response = await context.$axios.post(resources, payload, {
      onUploadProgress: progressEvent => {
        // send Upload progress to vuex for progress bars
        context.store.dispatch(
          "uploadProgress/setUploadProgress",
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async sendPrices(payload) {
    const response = await context.$axios.post(resources, payload, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async signAgreement() {
    const response = await context.$axios.get(resources, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async submitProfile() {
    const response = await context.$axios.get(resources, {
      headers: {
        Authorization: `Bearer ${context.$auth.strategy.token.get()}`
      }
    });
    return response;
  },
  async getProProfile(proId) {
    const response = await context.$axios.get(`${resources}/${proId}`);
    return response.data;
  }
});
