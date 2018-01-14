const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})$/;
const facebookRegex = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;
// eslint-disable-next-line max-len
const vimeoRegex = /(?:www\.|player\.)?vimeo.com\/(?:(?:channels|ondemand)\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;

export const isYoutube = url => youtubeRegex.test(url);
export const isFacebook = url => facebookRegex.test(url);
export const isVimeo = url => vimeoRegex.test(url);

export const isVideoUrl = url => [isYoutube, isFacebook, isVimeo].some(f => f(url));
