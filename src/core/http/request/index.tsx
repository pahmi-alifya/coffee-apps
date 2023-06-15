import {toJSON} from './helper';

interface OptionRequest extends RequestInit {
  method?: 'get' | 'post' | 'delete' | 'put' | 'patch';
}

const baseRequest = (url: RequestInfo, options?: OptionRequest) => {
  return fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }).then((response: Response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status}`);
  });
};

export const multipleRequest = (
  urls: RequestInfo[],
  options?: OptionRequest,
) => {
  return Promise.all(urls.map((url) => request(url, options)));
};

export const request = (url: RequestInfo, options?: OptionRequest) =>
  baseRequest(url, options).then(toJSON);
