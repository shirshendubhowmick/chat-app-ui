const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

const endpoint = {
  SESSION: '/user/session',
};

const apiMap = {
  CREATE_SESSION: {
    endpoint: endpoint.SESSION,
    method: httpMethods.POST,
  },
  GET_SESSION: {
    endpoint: endpoint.SESSION,
    method: httpMethods.POST,
  },
};

export default apiMap;
