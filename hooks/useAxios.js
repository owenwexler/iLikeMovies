import {
  ILM_API_BASE_URL,
  ILM_API_KEY
} from '../cfg/env';

import axios from 'axios';

const useAxios = async (args) => {
  const {
    route,
    method,
    params
  } = args;

  try {
    const response = await axios({
      url: `${ILM_API_BASE_URL}${route}`,
      method,
      params,
      headers: {
        apikey: ILM_API_KEY,
      }
    });

    return response;
  } catch (err) {
    return { error: err }
  }
};

export {
  useAxios
}
