export const getStrategyByStyle = style => (contentBlock, callback) => {
  if (contentBlock && contentBlock.inlineStyleRanges) {
    contentBlock.inlineStyleRanges
      .filter(range => range.style === style)
      .forEach(({ offset, length }) => callback(offset, offset + length));
  }
};
