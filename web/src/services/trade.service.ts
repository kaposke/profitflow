import api from './api.service';
import Trade from '../models/Trade';

const ENDPOINT = '/trades';

export default {
  get: () => api.get(ENDPOINT),
  create: (trade: Trade) => api.post(ENDPOINT, { ...trade }),
};