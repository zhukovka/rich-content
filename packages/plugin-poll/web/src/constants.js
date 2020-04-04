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
    'url("https://static.wixstatic.com/media/4f5c904bb9f4405bbbd900e8e43fb96d.jpg") center / cover',
    'url("https://static.wixstatic.com/media/ab97ccc955d74873998c0cc57a71859a.jpg") center / cover',
    'url("https://static.wixstatic.com/media/aa231f4eb7434370b337d1f66d1492a3.jpg") center / cover',
    'url("https://static.wixstatic.com/media/a952ed370d8e44ee9e01073bd746dc51.jpg") center / cover',
    'url("https://static.wixstatic.com/media/11062b_9aa7994fbb42451d869b8fa97538a695~mv2_d_3000_1800_s_2.jpg") center / cover',
    'url("https://static.wixstatic.com/media/40b04c9917f54b079fee33890219e1b6.jpg") center / cover',
    'url("https://static.wixstatic.com/media/8b1e14f8085c4644bf8afcb0c7cf9ffa.jpg") center / cover',
    'url("https://static.wixstatic.com/media/e04c5fcf6b684fd18511a17e74b1bde1.jpg") center / cover',
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

export const OPTION_IMAGES_POOL = [
  'https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images2.minutemediacdn.com/image/upload/c_crop,h_1188,w_2120,x_0,y_227/f_auto,q_auto,w_1100/v1554729678/shape/mentalfloss/58331-istock-479586616.jpg',
  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg',
  'https://static01.nyt.com/images/2020/03/13/science/13VIRUS-LABANIMALS1/13VIRUS-LABANIMALS1-mediumSquareAt3X.jpg',
];

export const POLL_IMAGES_POOL = [
  'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg',
  'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];
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
    ownVotes: [],
    title: '',
    settings: {
      multipleVotes: false,
      votersDisplay: true,
      voteRole: MEMBER_ROLES.ALL,
      viewRole: MEMBER_ROLES.VOTERS,
      type: 'CUSTOM',
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
