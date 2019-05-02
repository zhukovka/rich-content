import { BUTTON_TYPE } from './constants';
import { containerClassName } from './classNameStrategies';
import DynamicButtonViewer from './components/dynamic-button-viewer';

export const typeMapper = () => ({
  [BUTTON_TYPE]: {
    component: DynamicButtonViewer,
    classNameStrategies: { container: containerClassName },
  },
});
