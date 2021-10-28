export const apiProvider = (key = '', options = {}) => {
  const finalOptions = { 
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': key,
    }, 
    ...options, 
  };

  const apiObject = {
    get: async (endpoint) => fetch(endpoint, { ...finalOptions, method: 'GET' }),
    post: async (endpoint, data) => fetch(endpoint, { ...finalOptions, method: 'POST', body: JSON.stringify(data) }),
  };

  return apiObject;
};
