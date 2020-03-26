export const POLL_TYPE = 'wix-draft-plugin-poll';

export const LAYOUT = {
  LIST: 'list',
  GRID: 'grid',
};

export const COLOR_PALETTE = ['#cba27d', '#D5D4D4', '#ebba4d', '#0091ff', '#134497', '#82cb7d'];

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
    enableImage: false,
  },
  design: {
    backgroundColor: COLOR_PALETTE[2],
  },
};
