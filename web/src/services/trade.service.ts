import api from './api.service';
import Trade from '../models/Trade';
import { AxiosResponse } from 'axios';

const ENDPOINT = '/trades';

export default {
  get: () => api.get(ENDPOINT),
  create: (trade: Trade): Promise<AxiosResponse<Trade>> => api.post<Trade>(ENDPOINT, { ...trade }),
};