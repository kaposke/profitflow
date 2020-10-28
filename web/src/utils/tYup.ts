import i18n from 'i18next'

export function tYup(message: string | object | undefined, additionalOptions: object = {}) {
  if (!message) return;
  console.log(message);
  if (typeof(message) === 'string') return message;
  const { key, options } = ((message as unknown) as { key: string, options: object });
  return i18n.t(key, { ...options, ...additionalOptions});
}