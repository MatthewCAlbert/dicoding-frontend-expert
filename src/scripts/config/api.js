// import CONFIG from "./config";

export const apiProvider = (key = '', options = {}) => {
  const finalOptions = {
    ...options, 
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
