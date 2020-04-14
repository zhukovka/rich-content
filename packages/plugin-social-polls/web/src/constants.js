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
    'https://static.wixstatic.com/media/4f5c904bb9f4405bbbd900e8e43fb96d.jpg',
    'https://static.wixstatic.com/media/ab97ccc955d74873998c0cc57a71859a.jpg',
    'https://static.wixstatic.com/media/aa231f4eb7434370b337d1f66d1492a3.jpg',
    'https://static.wixstatic.com/media/a952ed370d8e44ee9e01073bd746dc51.jpg',
    'https://static.wixstatic.com/media/11062b_9aa7994fbb42451d869b8fa97538a695~mv2_d_3000_1800_s_2.jpg',
    'https://static.wixstatic.com/media/40b04c9917f54b079fee33890219e1b6.jpg',
    'https://static.wixstatic.com/media/8b1e14f8085c4644bf8afcb0c7cf9ffa.jpg',
    'https://static.wixstatic.com/media/e04c5fcf6b684fd18511a17e74b1bde1.jpg',
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
