export const RESIZE_FIT = 'fit';
export const RESIZE_COVER = 'cover';
export const DEFAULT_QUALITY = 80;

const DEFAULT_SIZE = 100; //reduced for performance (should get exact height after first render)

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
    const H = Math.ceil(height + 1); //make sure no sterching will occur
    const W = Math.ceil(width + 1);
    return `https://static.wixstatic.com/media/${fileName}/v1/fit/w_${W},h_${H},al_c,q_${quality}/file.jpg`;
  }
  return '';
};
