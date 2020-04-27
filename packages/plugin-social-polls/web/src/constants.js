export const POLL_TYPE = 'wix-draft-plugin-poll';

export const LAYOUT = {
  LIST: 'list',
  GRID: 'grid',
};

export const BACKGROUND_TYPE = {
  COLOR: 'color',
  IMAGE: 'image',
  GRADIENT: 'gradient',
};

/* eslint-disable max-len */
export const BACKGROUND_PRESETS = {
  [BACKGROUND_TYPE.COLOR]: [
    '#EF4538',
    '#F96132',
    '#FAAD4D',
    '#31B778',
    '#488FFE',
    '#11428D',
    '#6C49EF',
    '#8C0F7A',
  ],
  [BACKGROUND_TYPE.IMAGE]: [
    'https://images.unsplash.com/photo-1500829243541-74b677fecc30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3310&q=80',
    'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3334&q=80',
    'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3335&q=80',
    'https://images.unsplash.com/photo-1534293507278-19b2539423f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    'https://images.unsplash.com/photo-1520943241034-7866c2b35cdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80',
    'https://images.unsplash.com/photo-1446149330071-2f5996cb1b5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=933&q=80',
    'https://images.unsplash.com/photo-1507692744406-b171ab8feabd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1324&q=80',
    'https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjk0Mzg0fQ&auto=format&fit=crop&w=3367&q=80',
  ],
  [BACKGROUND_TYPE.GRADIENT]: [
    {
      angle: 45,
      start: '#EF4538',
      end: '#488FFE',
    },
    {
      angle: 45,
      start: '#F96132',
      end: '#FAAD4D',
    },
    {
      angle: 45,
      start: '#31B778',
      end: '#FAAD4D',
    },
    {
      angle: 45,
      start: '#0D6546',
      end: '#31B778',
    },
    {
      angle: 45,
      start: '#488FFE',
      end: '#8C0F7A',
    },
    {
      angle: 45,
      start: '#11428D',
      end: '#488FFE',
    },
    {
      angle: 45,
      start: '#6C49EF',
      end: '#31B778',
    },
    {
      angle: 45,
      start: '#8C0F7A',
      end: '#FAAD4D',
    },
  ].map(JSON.stringify),
};

export const OPTION_IMAGES_POOL = [
  'https://static.wixstatic.com/media/fb62d9f8e7824b2e90b13b971e700b92.jpg',
  'https://static.wixstatic.com/media/3a27828e768344158489df4f2c03cfb2.jpg',
];

export const POLL_IMAGES_POOL = [
  'https://static.wixstatic.com/media/436483e6ed9e41fe91b9f286d2ea4efb.jpg',
];
/* eslint-enable max-len */

export const MEMBER_ROLES = {
  ALL: 'ALL',
  SITE_MEMBERS: 'SITE_MEMBERS',
};

export const DIRECTION = {
  LTR: 'ltr',
  RTL: 'rtl',
};

export const VISIBILITY = {
  ALWAYS: 'ALWAYS',
  VOTERS: 'VOTERS_ONLY',
  ME: 'ONLY_ME',
};

export const DEFAULT_COMPONENT_DATA = {
  config: {
    alignment: 'center',
    size: 'large',
    width: 'full-width',
  },
  poll: {
    ownVotes: [],
    title: '',
    settings: {
      multipleVotes: false,
      votesDisplay: true,
      votersDisplay: true,
      voteRole: MEMBER_ROLES.ALL,
      resultsVisibility: VISIBILITY.VOTERS,
    },
    options: [
      {
        title: '',
      },
      {
        title: '',
      },
    ],
  },
  layout: {
    poll: {
      type: LAYOUT.LIST,
      direction: DIRECTION.LTR,
      enableImage: false,
    },
    option: {
      enableImage: false,
    },
  },
  design: {
    poll: {
      backgroundType: BACKGROUND_TYPE.COLOR,
      background: BACKGROUND_PRESETS[BACKGROUND_TYPE.COLOR][2],
      borderRadius: 0,
    },
    option: {
      borderRadius: 0,
    },
  },
};
