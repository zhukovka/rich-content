export const PAGE_SIZE = 25;
export const WAIT_INTERVAL = 300;
export const YOUTUBE_TYPE = 'wix-draft-plugin-youtube';
export const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';
export const YOUTUBE_API_KEY = 'AIzaSyBSlceHx8OFjGS16AMd4HulnCJltz94S3Q';
export const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';

export const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center',
  },
};

export const MobileFullScreenCustomStyle = {
  overlay: {
    backgroundColor: 'transparent',
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    paddingRight: '6px',
  },
};

export const DesktopFlyOutModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5,
  },
  content: {
    width: '620px',
    maxWidth: '620px',
    boxSizing: 'border-box',
    height: '383px',
    overflow: 'visible',
    border: '1px solid #ccc',
    paddingRight: '10px',
    paddingLeft: '18px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '9px',
  },
};
