const axios = require('axios');

export const linkPreviewUtil = authStr => {
  const _axios = axios.create({ headers: { Authorization: authStr } });
  let state = {};
  const getAbsoluteUrl = url =>
    url.substring(0, 7) === 'http://' || url.substring(0, 8) === 'https://' ? url : 'http://' + url;

  return async url => {
    const { title, url: oldUrl } = state;
    if (oldUrl === url && title) {
      return state;
    }
    let oEmbedRes;
    try {
      oEmbedRes = await _axios
        .get(`/rich-content/oembed?url=${getAbsoluteUrl(url)}`)
        .then(res => res.data);
      state = oEmbedRes;
    } catch (e) {
      console.error('caught', e); //eslint-disable-line no-console
      return new Promise(resolve => {
        setTimeout(() => resolve({}), 1);
      });
    }

    return oEmbedRes;
  };
};
