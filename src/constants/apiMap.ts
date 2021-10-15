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
  SESSION_STATUS: '/status/session',
  MESSAGE: '/message',
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
  GET_SESSION_STATUS: {
    endpoint: endpoint.SESSION_STATUS,
    method: httpMethods.GET,
  },
  GET_HISTORICAL_MESSAGES: {
    endpoint: endpoint.MESSAGE,
    method: httpMethods.GET,
  },
};

export default apiMap;
