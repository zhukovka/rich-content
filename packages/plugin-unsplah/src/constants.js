export const PAGE_SIZE = 25;
export const WAIT_INTERVAL = 300;
export const SEARCH_TYPE = 'gifs';
export const UNSPLASH_TYPE = 'wix-draft-plugin-unsplash';

export const DEFAULTS = {
  config: {
    size: 'content',
    alignment: 'center'
  },
};

export const MobileFullScreenCustomStyle = {
  overlay: {
    backgroundColor: 'transparent'
  },
  content: {
    top: 0,
    left: 0,
    overflow: 'hidden',
    paddingRight: '6px',
  }
};

export const DesktopFlyOutModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 5
  },
  content: {
    width: '620px',
    boxSizing: 'border-box',
    maxWidth: 'none',
    height: '376px',
    overflow: 'visible',
    border: '1px solid #ccc',
    paddingRight: '12px',
    paddingLeft: '12px',
    display: 'block',
    borderRadius: '2px',
    position: 'absolute',
    zIndex: 6,
    paddingTop: '13px'
  }
};
