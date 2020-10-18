import api from './api.service';

const ENDPOINT = '/users';

export default {
  create: (data: { username: string, email: string, password: string, password_confirmation: string}) => api.post(ENDPOINT, { ...data }),
  requestPasswordChange: (email: string) => api.get(`${ENDPOINT}/request-password-change`, { params: { email } }),
  changePassword: (token: string, password: string, password_confirmation: string) => api.post(`${ENDPOINT}/change-password`, { token, password, password_confirmation }),
};