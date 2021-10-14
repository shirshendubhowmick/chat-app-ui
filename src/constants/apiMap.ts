import { HttpMethods } from '~/services/networkServices';

const httpMethods: { [key in HttpMethods]: HttpMethods } = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
};

const endpoint = {
  SESSION: '/user/session',
};

const apiMap: {
  [key: string]: {
    endpoint: string;
    method: HttpMethods;
  };
} = {
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
