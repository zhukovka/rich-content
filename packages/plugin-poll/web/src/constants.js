export const POLL_TYPE = 'wix-draft-plugin-poll';

export const COLOR_PALETTE = ['#cba27d', '#D5D4D4', '#ebba4d', '#0091ff', '#134497', '#82cb7d'];

export const MEMBER_ROLES = {
  EVERYONE: 'everyone',
  VOTERS: 'voters',
  ME: 'me',
  SITE_MEMBER: 'site_member',
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
      voteRole: MEMBER_ROLES.SITE_MEMBER,
      viewRole: MEMBER_ROLES.VOTERS,
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
  layout: {},
  design: {
    backgroundColor: COLOR_PALETTE[2],
  },
};
