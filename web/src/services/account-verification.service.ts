import api from './api.service';

export default {
  requestVerificationEmail: () => api.get('/request-verification-email'),
  verify: (token: string) => api.get<{ type: string, token: string, name: string, email: string, verified: boolean }>('/verify', { params: { token }}),
};