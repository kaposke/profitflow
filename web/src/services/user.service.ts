import api from './api.service';

const ENDPOINT = '/users';

export default {
  create: (data: { username: string, email: string, password: string, password_confirmation: string}) => api.post(ENDPOINT, { ...data }),
};