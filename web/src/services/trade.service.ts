import api from './api.service';
import Trade from '../models/Trade';
import { AxiosResponse } from 'axios';

const ENDPOINT = '/trades';

export default {
  get: (page: number, perPage: number = 20) => api.get(ENDPOINT, { params: { page, perPage } }),
  create: (trade: Trade): Promise<AxiosResponse<Trade>> => api.post<Trade>(ENDPOINT, { ...trade }),
  update: (id: number, trade: Trade): Promise<AxiosResponse<Trade>> => api.put<Trade>(`${ENDPOINT}/${id}`, { ...trade }),
  delete: (id: number): Promise<AxiosResponse<Trade>> => api.delete(`${ENDPOINT}/${id}`),
};