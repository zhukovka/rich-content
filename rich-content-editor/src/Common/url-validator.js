// eslint-disable-next-line max-len, no-useless-escape
const validUrlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const isValidUrl = url => validUrlRegex.test(url);
