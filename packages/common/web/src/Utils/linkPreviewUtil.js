const axios = require('axios');

export const linkPreviewUtil = authStr => {
  const _axios = axios.create({ headers: { Authorization: authStr } });
  let state = {};
  return async url => {
    const { title, description, thumbnail_url, html, url: oldUrl } = state;
    if (oldUrl === url && (!!title || description || thumbnail_url || html)) {
      return state;
    }
    try {
      const { title, description, thumbnail_url, html } = await _axios.get(
        `https://www.wix.com/rich-content/oembed?url=${url}`
      );
      state = {
        title,
        description,
        thumbnail_url,
        html,
      };
      return { title, description, thumbnail_url };
    } catch {
      const title = 'A mock title';
      const description = 'A mock description';
      const thumbnail_url =
        'https://image.insider.com/5de5784979d757159d0b6838?width=1100&format=jpeg&auto=webp';
      state = {
        title,
        description,
        thumbnail_url,
      };
      return { title, description, thumbnail_url };
    }
  };
};
