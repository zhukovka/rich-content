import linkifyIt from 'linkify-it';
const linkify = linkifyIt();

/* eslint-disable max-len, no-useless-escape */
const validUrlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})$/;
const facebookRegex = /facebook\.com\/([^/?].+\/)?video(s|\.php)[/?].*$/;
const vimeoRegex = /(?:www\.|player\.)?vimeo.com\/(?:(?:channels|ondemand)\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
/* eslint-enable max-len, no-useless-escape */

const isYoutube = url => youtubeRegex.test(url);
const isFacebook = url => facebookRegex.test(url);
const isVimeo = url => vimeoRegex.test(url);

export const isVideoUrl = url => [isYoutube, isFacebook, isVimeo].some(f => f(url));

export const isValidUrl = url => validUrlRegex.test(url);

export const normalizeURL = url => (linkify.match(url) || [{}])[0].url;
