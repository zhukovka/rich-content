import pickBy from 'lodash/pickBy';

export const getToolbarTheme = (theme, type) => ({
  toolbarStyles: pickBy(theme, className =>
    className.startsWith(`${type}Toolbar`)
  ),
  buttonStyles: pickBy(theme, className =>
    className.startsWith(`${type}ToolbarButton`)
  ),
  separatorStyles: pickBy(theme, className =>
    className.startsWith(`${type}ToolbarSeparator`)
  ),
  wrapperStyles: pickBy(theme, className =>
    className.startsWith(`${type}ToolbarWrapper`)
  )
});
