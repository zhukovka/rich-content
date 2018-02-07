import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';
import merge from 'lodash/merge';



const mobileModalStyles = {
  overlay: {
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% + 5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 5
  },
  content: {
    position: 'fixed',
    top: '50%',
    right: 0,
    left: 0,
    border: 'none',
    backgroundColor: 'white',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    outline: 'none',
    padding: 0,
    height: 'auto',
    width: 'calc(100% - 20px)',
    margin: '0 10px',
  }
};

const mobileFullScreenOverrideStyles = {
  overlay: {
    top: 0,
    left: 0,
    right: 'auto',
    bottom: 'auto',
    height: '100vh',
    width: '100vw',
    margin: 0
  },
  content: {
    top: 0,
    left: 0,
    right: 'auto',
    bottom: 'auto',
    backgroundColor: '#fff',
    height: '100vh',
    width: '100vw',
    margin: 0
  }
};

const desktopModalStyles = {
  overlay: {
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    position: 'fixed',
    width: '100%',
    height: 'calc(100% + 85px)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 5
  },
  content: {
    position: 'fixed',
    top: 0,
    left: 'auto',
    right: 0,
    bottom: 'auto',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: 0,
    outline: 'none',
    padding: 0,
    height: '100%',
    width: '100%',
    maxWidth: '420px'
  }
};

export const getModalStyles = ({ customStyles = null, fullScreen = true } = {}) => {
  const overrideStyles = [];
  if (customStyles) {
    overrideStyles.push(customStyles);
  }

  if (baseUtils.isMobile()) {
    if (fullScreen) {
      overrideStyles.push(mobileFullScreenOverrideStyles);
    }
    return merge({}, mobileModalStyles, ...overrideStyles);
  } else {
    return merge({}, desktopModalStyles, ...overrideStyles);
  }
};
