import { getSelectedBlocks, getSelectionRange, isInSelectionRange } from './draftUtils';

const getBlockStyleRanges = (block, styles) => {
  const styleRanges = [];
  styles.forEach(style => block.findStyleRanges(character => character.hasStyle(style),
    (start, end) => styleRanges.push({ start, end, style })));
  return styleRanges;
};

/**
 * @param allStyles: [string] - set of exclusive inline styles
 */
export const getSelectionStyles = (allStyles, editorState) => {

  const selectedBlocks = getSelectedBlocks(editorState);

  return selectedBlocks.reduce(
    (selectedStyles, block) => {

      const blockSelectionRange = getSelectionRange(editorState, block);

      // for each selected block, get its style ranges (only for styles passed in allStyles)
      const blockStyleRanges = getBlockStyleRanges(block, allStyles); // { start, end, style }

      // if style range is in selection, add this style to result
      return selectedStyles.concat(blockStyleRanges
        .filter(range => isInSelectionRange(blockSelectionRange, [range.start, range.end]))
        .map(range => range.style));
    }, []);
};
