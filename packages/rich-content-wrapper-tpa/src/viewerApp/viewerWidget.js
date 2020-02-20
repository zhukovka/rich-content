import { withStyles } from '@wix/native-components-infra';
import Widget from '../components/Widget';

export default {
  component: withStyles(Widget, {
    ltrCssPath: ['viewerWidget.css'],
    rtlCssPath: ['viewerWidget.rtl.css'],
    strictMode: false,
  }),
};
