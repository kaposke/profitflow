/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Is invalid',
    required: '${label} is required'
  },
  number: {
    min: 'Should be at least ${min} characters.',
  },
});