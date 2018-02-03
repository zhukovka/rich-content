import { PureComponent } from 'react';
import mergeWith from 'lodash/mergeWith';
import pickBy from 'lodash/pickBy';
import has from 'lodash/has';

class Themable extends PureComponent {

  classMerger = (defaultStyleClassName, themeClassName) =>
    `${defaultStyleClassName} ${themeClassName}`;

  render() {
    const defaultStyles = { ...this.getDefaultStyles() };
    const theme = this.getTheme();
    const themeStylesToMerge = pickBy(theme, (value, key) => has(defaultStyles, key));
    const mergedStyles = mergeWith(defaultStyles, themeStylesToMerge, this.classMerger);
    return this.renderDesktop(mergedStyles);
    //TODO: call renderMobile(mergedStyles) if isMobile
  }
}

export default Themable;
