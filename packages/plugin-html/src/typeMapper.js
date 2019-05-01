import HtmlComponent from './dynamic-html-component';
import { HTML_TYPE } from './types';

export const typeMapper = () => ({
  [HTML_TYPE]: { component: HtmlComponent },
});
