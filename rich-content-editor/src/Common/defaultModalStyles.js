import { baseUtils } from 'photography-client-lib/dist/src/utils/baseUtils';

export const getModalStyles = () => {
  if (baseUtils.isMobile()) {
    return {
      overlay: {
        top: 0,
        left: 'auto',
        right: 0,
        bottom: 'auto',
        position: 'fixed',
        width: '100%',
        height: 'calc(100% + 5px)',
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
        background: '#111',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: 0,
        outline: 'none',
        padding: 0,
        height: '100%',
        width: '100%',
      }
    };
  } else {
    return {
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
  }
};
