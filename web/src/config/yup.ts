/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: ({ label }) => ({ key: 'yup.default', options: { label }}),
    required: ({ label }) => ({ key: 'yup.required', options: { label }}),
    notType: 'yup.notType', 
  },
  string: {
    email: ({ label }) => ({ key: 'yup.email', options: { label }}),
    min: ({ label, min }) => ({ key: 'yup.min', options: { label, min }}),
  }
});