import api from './api.service';

const ENDPOINT = '/login';

export default {
  signIn: (data: { email: string, password: string }) => api.post(ENDPOINT, { ...data }),
};