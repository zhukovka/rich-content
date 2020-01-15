/* eslint-disable */
const axios = require('axios');
const AUTH_TOKEN = `D0nawxcVUD5MtaQ8yKCNagHIWvpDGTRGqUfKfaqtKok.eyJpbnN0YW5jZUlkIjoiZDM0MDgzYTItNTlhYi00MTJjLWI0NjItNzk1NTk0MWMxOWQwIiwiYXBwRGVmSWQiOiIxNGJjZGVkNy0wMDY2LTdjMzUtMTRkNy00NjZjYjNmMDkxMDMiLCJtZXRhU2l0ZUlkIjoiYmM0ZjIzODEtMzY1Mi00MTE4LWIxOGItY2NmNDE2MmZkZTA3Iiwic2lnbkRhdGUiOiIyMDIwLTAxLTE0VDE2OjMwOjEyLjY2OVoiLCJkZW1vTW9kZSI6ZmFsc2UsIm9yaWdpbkluc3RhbmNlSWQiOiI2N2RkZDA5ZS00YWU5LTQ5NWMtOWE4OS0wZGZiZGY4MTQ4ZTYiLCJhaWQiOiIyMWY2NzFiZS05OGZlLTQxMTctYjg4ZC02YzI2ZTJjN2YxNzkiLCJiaVRva2VuIjoiNmYwZmEwMjMtNmZmOS0wMDM0LTA1ZTktYjVhMTgyMzNjN2Q3Iiwic2l0ZU93bmVySWQiOiI4MTk2ZGM1Ni1kNDVjLTRkZWYtYTc2Ny0zMDAyNDZhYjBiN2EifQ`;
const mockBasePath = `https://cors-anywhere.herokuapp.com/http://stehauho.wixsite.com`;

export const fetchLinkMetdata = async (url, basePath, authorization) => {
  axios.defaults.headers.common.Authorization = AUTH_TOKEN;
  return axios.get(`${mockBasePath}/rich-content/oembed?url=${url}`, {
    headers: { Authorization: AUTH_TOKEN },
  });
};

export const getPreviewLinkMetadata = async (url, basePath, authorization) => {
  const { title, description, thumbnail_url } = await fetchLinkMetdata(
    url,
    basePath,
    authorization
  );
  return {
    title,
    description,
    thumbnail_url,
    url,
  };
};

export const getEmbedLinkMetadata = async (url, basePath, authorization) => {
  const { html } = await fetchLinkMetdata(url, basePath, authorization);
  return html;
};
