export const RESIZE_FIT = 'fit';
export const RESIZE_COVER = 'cover';
export const DEFAULT_QUALITY = 80;

const DEFAULT_SIZE = 1000;

const RESIZE = {
  [RESIZE_COVER]: (w, h, rw, rh) => {
    if (rw > w || rh > h) {
      return {
        width: w,
        height: h,
      };
    }

    const wRatio = rw / w;
    const hRatio = rh / h;
    const ratio = Math.max(wRatio, hRatio);
    return {
      width: Math.ceil(w * ratio),
      height: Math.ceil(h * ratio),
    };
  },
  [RESIZE_FIT]: (w, h, rw, rh) => {
    if (rw > w && rh > h) {
      return {
        width: w,
        height: h,
      };
    }

    return {
      width: rw,
      height: rh,
    };
  },
};

// eslint-disable-next-line max-params
export default (
  { file_name: fileName, width: w, height: h } = {},
  rw = DEFAULT_SIZE,
  rh = DEFAULT_SIZE,
  quality = DEFAULT_QUALITY,
  type = RESIZE_FIT
) => {
  if (fileName) {
    const { width, height } = RESIZE[type](w, h, rw, rh);
    return `https://static.wixstatic.com/media/${fileName}/v1/fit/w_${width},h_${height},al_c,q_${quality}/file.jpg`;
  }
  return '';
};
