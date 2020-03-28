export const POLL_TYPE = 'wix-draft-plugin-poll';

export const LAYOUT = {
  LIST: 'list',
  GRID: 'grid',
  WITH_IMAGE: 'with_image',
};

export const BACKGROUND_TYPE = {
  COLOR: 'color',
  IMAGE: 'image',
  GRADIENT: 'gradient',
};

/* eslint-disable max-len */
export const BACKGROUND_PRESETS = {
  [BACKGROUND_TYPE.COLOR]: [
    '#cba27d',
    'rgba(250, 100, 0, 0.78)',
    '#ebba4d',
    '#0091ff',
    'rgba(232, 54, 255, 0.94)',
    '#134497',
    'rgba(0, 0, 0, 0.85)',
    '#82cb7d',
  ],
  [BACKGROUND_TYPE.IMAGE]: [
    'url("https://cdn.wallpaperhub.app/cloudcache/1/b/5/8/e/f/1b58ef6e3d36a42e01992accf5c52d6eea244353.jpg") center / cover',
    'url("https://cdn.wallpaperhub.app/cloudcache/3/5/a/5/3/e/35a53e37301cf17d574230812c9a6e0d659d33d0.jpg") center / cover',
  ],
  [BACKGROUND_TYPE.GRADIENT]: [
    'linear-gradient(226deg, #890c78, #f7b500)',
    'linear-gradient(43deg, #0b4ad1, #b6fb64)',
    'linear-gradient(225deg, #c400ff, #27d9d6)',
    'linear-gradient(225deg, #1c0ea7, #e3bdee)',
    'linear-gradient(45deg, #a2eb4d, #34852a)',
    'linear-gradient(225deg, #ff9400, #d6b88f)',
    'linear-gradient(45deg, #d3d3d3, #36403c)',
    'linear-gradient(225deg, #f53f3b, #ffa19a)',
  ],
};
/* eslint-enable max-len */

export const MEMBER_ROLES = {
  ALL: 'ALL',
  VOTERS: 'VOTERS',
  ME: 'ME',
  SITE_MEMBERS: 'SITE_MEMBERS',
};

export const DEFAULT_COMPONENT_DATA = {
  config: {
    alignment: 'center',
    size: 'large',
    width: 'full-width',
  },
  poll: {
    id: '',
    chosen: [],
    title: '',
    imageUrl: '',
    settings: {
      multipleChoice: false,
      secret: false,
      voteRole: MEMBER_ROLES.ALL,
      viewRole: MEMBER_ROLES.VOTERS,
      type: 'CUSTOM',
    },
    options: [
      {
        title: '',
        imageUrl: '',
      },
      {
        title: '',
        imageUrl: '',
      },
    ],
  },
  layout: {
    type: LAYOUT.LIST,
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
