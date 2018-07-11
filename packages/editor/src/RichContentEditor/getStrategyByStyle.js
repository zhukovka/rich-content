export const getStrategyByStyle = style => (contentBlock, callback) => {
  contentBlock.findStyleRanges(character => character.hasStyle(style),
    (start, end) => callback(start, end));
};
