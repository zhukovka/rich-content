const paywallEntityMap = {
  type: 'wix-draft-plugin-paywall',
  mutability: 'IMMUTABLE',
  data: {
    type: 'single',
    config: {},
  },
};
const paywallBlock = {
  key: 'paywall-key',
  text: ' ',
  type: 'atomic',
  depth: 0,
  inlineStyleRanges: [],
  entityRanges: [
    {
      offset: 0,
      length: 1,
      key: 0,
    },
  ],
  data: {},
};

export const insertPaywall = contentState => {
  const entities = Object.keys(contentState.entityMap);
  const paywallEntityMapIndex = entities.length;
  const paywallBlockToInsert = paywallBlock;
  paywallBlockToInsert.entityRanges[0].key = paywallEntityMapIndex;
  const newContentState = {
    ...contentState,
    entityMap: {
      ...contentState.entityMap,
      [paywallEntityMapIndex]: paywallEntityMap,
    },
    blocks: [contentState.blocks[0], paywallBlockToInsert, ...contentState.blocks.slice(1)],
  };
  return newContentState;
};

export const isPaywallInUse = contentState => {
  return !!paywallEntityMapIndex(contentState);
};

export const removePaywall = contentState => {
  const indexOfPaywallBlock = contentState.blocks.findIndex(block => block.key === 'paywall-key');
  const newContentState = {
    ...contentState,
    entityMap: {
      ...getEntityMapWithoutPaywall(contentState),
    },
    blocks: [
      ...contentState.blocks.slice(0, indexOfPaywallBlock),
      ...contentState.blocks.slice(indexOfPaywallBlock + 1),
    ],
  };
  return newContentState;
};

export const cutContentUnderPaywall = contentState => {
  const indexOfPaywallBlock = contentState.blocks.findIndex(block => block.key === 'paywall-key');
  const newContentState = {
    ...contentState,
    entityMap: {
      ...getEntityMapWithoutPaywall(contentState),
    },
    blocks: [...contentState.blocks.slice(0, indexOfPaywallBlock)],
  };
  return newContentState;
};

const getEntityMapWithoutPaywall = contentState => {
  const indexOfPaywallEntityMap = paywallEntityMapIndex(contentState);
  // eslint-disable-next-line no-unused-vars
  const { [indexOfPaywallEntityMap]: _, ...restOfEntityMap } = contentState.entityMap;
  return restOfEntityMap;
};

const paywallEntityMapIndex = contentState => {
  let index = null;
  const entityMap = contentState.entityMap;
  for (const entity in entityMap) {
    if (entityMap[entity].type === 'wix-draft-plugin-paywall') {
      index = entity;
    }
  }
  return index;
};
