const axios = require('axios');

export const linkPreviewUtil = authStr => {
  const _axios = axios.create({ headers: { Authorization: authStr } });
  let state = {};
  return async url => {
    const { title, url: oldUrl } = state;
    if (oldUrl === url && title) {
      return state;
    }
    let oEmbedRes;
    try {
      oEmbedRes = await _axios.get(`/rich-content/oembed?url=${url}`).then(res => res.data);
      state = oEmbedRes;
    } catch (e) {
      console.error('caught', e); //eslint-disable-line no-console
      oEmbedRes = new Promise(resolve => {
        setTimeout(
          () =>
            resolve({
              title: 'A mock title',
              description: 'A mock description',
              thumbnail_url:
                'https://image.insider.com/5de5784979d757159d0b6838?width=1100&format=jpeg&auto=webp', //eslint-disable-line
              provider_url: 'www.wix.com',
            }),
          1
        );
      });
    }

    return oEmbedRes;
  };
};
