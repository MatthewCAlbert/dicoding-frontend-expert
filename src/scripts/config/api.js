// import CONFIG from "./config";
// const controller = new AbortController();
// const timeoutId = setTimeout(() => controller.abort(), 5000);

export const apiProvider = (key = '', options = {}) => {
  const finalOptions = {
    ...options, 
    // signal: controller.signal,
  };

  const apiObject = {
    get: async (endpoint) => fetch(endpoint, { ...finalOptions, method: 'GET' }),
    post: async (endpoint, data) => fetch(endpoint, {
      ...finalOptions,
      mode: 'cors',
      headers: {
        ...finalOptions.headers,
        'Content-Type': 'application/json',
        // 'X-Auth-Token': CONFIG.API_KEY,
      },
      method: 'POST',
      body: JSON.stringify(data), 
    }),
  };

  return apiObject;
};
