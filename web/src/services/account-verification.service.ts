import api from './api.service';

const ENDPOINT = '/verify';

export default {
  verify: (token: string) => api.get<{ type: string, token: string, name: string, email: string, verified: boolean }>(ENDPOINT, { params: { token }}),
};