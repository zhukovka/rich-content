
class WixMediaUrl {
  constructor() {
    // default small size & quality for performance (should get exact height after first render)
    this.DEFAULT_SIZE = 100;
    this.DEFAULT_QUALITY = 30;

    this.isWebpSupported = false;
    this.testWebP();
  }

  testWebP = () => {
    //sync test
    const canvas = typeof document === 'object' ? document.createElement('canvas') : {};
    canvas.width = canvas.height = 1;
    const canvasDataURL = canvas.toDataURL ? canvas.toDataURL('image/webp') : null;
    this.isWebpSupported = canvasDataURL ? canvasDataURL.indexOf('image/webp') === 5 : false;
  };

  resize(type, w, h, rw, rh) {
    switch (type) {
      case 'fill':
      case 'cover':
        if (rw > w || rh > h) {
          return {
            width: w,
            height: h,
          };
        }
        return {
          width: Math.ceil(w * Math.max(rw / w, rh / h)),
          height: Math.ceil(h * Math.max(rw / w, rh / h)),
        };
      case 'fit':
      default:
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
    }
  }

  createUrl = (
    { file_name: fileName, width: w, height: h } = {},
    rw = this.DEFAULT_SIZE,
    rh = this.DEFAULT_SIZE,
    quality = this.DEFAULT_QUALITY,
    type = 'fit'
  ) => {
    if (fileName) {
      const { width, height } = this.resize(type, w, h, rw, rh);
      const H = Math.ceil(height + 1); //make sure no sterching will occur
      const W = Math.ceil(width + 1);
      const suffix = this.isWebpSupported ? 'webp' : 'jpg';
      return `https://static.wixstatic.com/media/${fileName}/v1/fit/w_${W},h_${H},al_c,q_${quality}/file.${suffix}`;
    }
    return '';
  };

}

const wixMediaUrl = new WixMediaUrl();
export default wixMediaUrl;
