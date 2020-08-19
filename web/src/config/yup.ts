/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Is invalid',
    required: '${label} is required',
    notType: '${label} should be a ${type}'
  },
  number: {
    min: 'Should be at least ${min} characters.',
  },
});