/* eslint-disable */
const TestData = {
  onlyText: {
    entityMap: {},
    blocks: [
      {
        key: '5g8yu',
        text: 'Hello text only #hashtag test.com',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  },
  'basic styles': {
    blocks: [
      {
        key: '45ded',
        text: 'H1',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '8mis',
        text: 'H2',
        type: 'header-two',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '8mif',
        text: 'כותרת H3',
        type: 'header-three',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '61u53',
        text: 'H2 center',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: 'inline-header-two',
          },
        ],
        entityRanges: [],
        data: {
          textAlignment: 'center',
        },
      },
      {
        key: 'b69na',
        text: 'H2 bold',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 7,
            style: 'inline-header-two',
          },
          {
            offset: 0,
            length: 7,
            style: 'BOLD',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '2qet3',
        text: 'H2 italic',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: 'inline-header-two',
          },
          {
            offset: 0,
            length: 9,
            style: 'ITALIC',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '9hjyr',
        text: 'H2 with inline text',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: 'inline-header-two',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '3sg5e',
        text: 'H2 underline right',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 18,
            style: 'inline-header-two',
          },
          {
            offset: 0,
            length: 18,
            style: 'UNDERLINE',
          },
        ],
        entityRanges: [],
        data: {
          textAlignment: 'right',
        },
      },
      {
        key: 'b8b0u',
        text: 'H2 numbered',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 11,
            style: 'inline-header-two',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '9skn5',
        text: 'H2 bullet',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: 'inline-header-two',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'fbp7d',
        text: 'H3 center',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: 'inline-header-three',
          },
        ],
        entityRanges: [],
        data: {
          textAlignment: 'center',
        },
      },
      {
        key: 'aq7ob',
        text: 'H3 bold',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 7,
            style: 'inline-header-three',
          },
          {
            offset: 0,
            length: 7,
            style: 'BOLD',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'clcev',
        text: 'H3 italic',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: 'inline-header-three',
          },
          {
            offset: 0,
            length: 9,
            style: 'ITALIC',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'ag9to',
        text: 'H3 underline right',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 18,
            style: 'inline-header-three',
          },
          {
            offset: 0,
            length: 18,
            style: 'UNDERLINE',
          },
        ],
        entityRanges: [],
        data: {
          textAlignment: 'right',
        },
      },
      {
        key: '3mbj4',
        text: 'רשימה סדורה',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 11,
            style: 'inline-header-three',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'bcsbh',
        text: 'רשימה לא סדורה',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 14,
            style: 'inline-header-three',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '2fdkb',
        text: 'טקסט ממורכז',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          textAlignment: 'center',
        },
      },
      {
        key: '6ebba',
        text: 'Text bold',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 9,
            style: 'BOLD',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '9tadl',
        text: 'Text italic',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 11,
            style: 'ITALIC',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'it2e',
        text: 'Text underline right',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 20,
            style: 'UNDERLINE',
          },
        ],
        entityRanges: [],
        data: {
          textAlignment: 'right',
        },
      },
      {
        key: '8utpq',
        text: 'Text numbered',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'f60gq',
        text: 'Text bullet',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '92tkf',
        text: 'new soft line below this list item\n',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'cmo3s',
        text: 'new soft line above this list item',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '8vk72',
        text: 'Quote1',
        type: 'blockquote',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '6mlr2',
        text: 'ציטוט',
        type: 'blockquote',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '7c1rt',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'c3m22',
        text: '// TODO: get normal code example\nvar x = 5;\nvar y = 8;\nvar z = Math.min(x,y);',
        type: 'code-block',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          textAlignment: 'left',
        },
      },
      {
        key: '5ej',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  softNewLine: {
    blocks: [
      {
        key: '4rcs3',
        text: "test me!hi, my name is Dor. \nI'm an idiot",
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 8,
            style: 'inline-header-one',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'c926g',
        text: 'one more block \nand this is a normal text',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 14,
            style: 'inline-header-one',
          },
        ],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  lists: {
    blocks: [
      {
        key: 'b1jra',
        text: 'h2test',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: 'inline-header-one',
          },
          {
            offset: 0,
            length: 6,
            style: 'BOLD',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '9ne2e',
        text: 'h3test',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: 'inline-header-two',
          },
          {
            offset: 0,
            length: 6,
            style: 'ITALIC',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '6gc05',
        text: 'h4test',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 2,
            style: 'inline-header-three',
          },
          {
            offset: 0,
            length: 6,
            style: 'UNDERLINE',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '3ipk5',
        text: '',
        type: 'ordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '3k78h',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '4vk1l',
        text: 'h2\ntest',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: 'inline-header-one',
          },
          {
            offset: 0,
            length: 7,
            style: 'BOLD',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'f76qt',
        text: 'h3\ntest',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: 'inline-header-two',
          },
          {
            offset: 0,
            length: 7,
            style: 'ITALIC',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: 'dc2cf',
        text: 'h4\ntest',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [
          {
            offset: 0,
            length: 3,
            style: 'inline-header-three',
          },
          {
            offset: 0,
            length: 7,
            style: 'UNDERLINE',
          },
        ],
        entityRanges: [],
        data: {},
      },
      {
        key: '4clif',
        text: '',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  links: {
    blocks: [
      {
        key: 'foo',
        text:
          'Search was Google’s only unambiguous win, as well as its primary source of revenue, so when Amazon rapidly surpassed Google as the top product search destination, Google’s foundations began to falter. As many noted at the time, the online advertising industry experienced a major shift from search to discovery in the mid-2010s.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 57,
            length: 25,
            key: 0,
          },
          {
            offset: 99,
            length: 24,
            key: 1,
          },
          {
            offset: 204,
            length: 10,
            key: 2,
          },
        ],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          href:
            'http://www.cnbc.com/2017/01/26/googlealphabet-reports-fourth-quarter-2016-earnings-q4.html',
          rel: 'noopener',
          target: '_blank',
          url:
            'http://www.cnbc.com/2017/01/26/googlealphabet-reports-fourth-quarter-2016-earnings-q4.html',
        },
      },
      '1': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          href:
            'http://www.geekwire.com/2017/amazon-continues-grow-lead-google-starting-point-online-shoppers/',
          rel: 'noopener',
          target: '_blank',
          url:
            'http://www.geekwire.com/2017/amazon-continues-grow-lead-google-starting-point-online-shoppers/',
        },
      },
      '2': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          href: 'https://techcrunch.com/2016/08/11/google-isnt-safe-from-yahoos-fate/',
          rel: 'noopener',
          target: '_blank',
          url: 'https://techcrunch.com/2016/08/11/google-isnt-safe-from-yahoos-fate/',
        },
      },
    },
  },
  giphy: {
    blocks: [
      {
        key: 'fls2k',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'cksr1',
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
      },
      {
        key: 'c8hff',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-giphy',
        mutability: 'IMMUTABLE',
        data: {
          config: {
            size: 'content',
            alignment: 'center',
          },
          gif: {
            originalUrl: 'https://media0.giphy.com/media/7ZidoKPclnq7e/giphy.gif',
            stillUrl: 'https://media0.giphy.com/media/7ZidoKPclnq7e/giphy_s.gif',
            height: 306,
            width: 250,
          },
        },
      },
    },
  },
  legacyVideo: {
    entityMap: {
      '0': {
        type: 'VIDEO-EMBED',
        mutability: 'IMMUTABLE',
        data: {
          src: 'https://www.youtube.com/watch?v=eqZVIiD6wSg',
          config: { size: 'content' },
        },
      },
    },
    blocks: [
      {
        key: 'ov8f',
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
      },
    ],
  },
  video: {
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-video',
        mutability: 'IMMUTABLE',
        data: {
          src: 'https://www.youtube.com/watch?v=eqZVIiD6wSg',
        },
        config: {
          alignment: 'center',
          size: 'content',
          key: 'ov8f',
        },
      },
    },
    blocks: [
      {
        key: 'ov8f',
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
      },
    ],
  },
  html: {
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-html',
        mutability: 'IMMUTABLE',
        data: {
          src: 'https://www.youtube.com/embed/owsfdh4gxyc',
          srcType: 'url',
          config: {
            width: 560,
            height: 340,
            safe: true,
          },
        },
      },
    },
    blocks: [
      {
        key: 'ov8f',
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
      },
    ],
  },
  divider: {
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-divider',
        mutability: 'IMMUTABLE',
        data: {
          type: 'single',
          config: {
            size: 'small',
            alignment: 'center',
            textWrap: 'nowrap',
            key: 'ov8f',
          },
        },
      },
      '1': {
        type: 'wix-draft-plugin-divider',
        mutability: 'IMMUTABLE',
        data: {
          type: 'dashed',
          config: {
            size: 'medium',
            alignment: 'center',
            textWrap: 'nowrap',
            key: '7poao',
          },
        },
      },
      '2': {
        type: 'wix-draft-plugin-divider',
        mutability: 'IMMUTABLE',
        data: {
          type: 'double',
          config: {
            size: 'large',
            alignment: 'center',
            textWrap: 'nowrap',
            key: '6gci3',
          },
        },
      },
    },
    blocks: [
      {
        key: 'ov8f',
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
      },
      {
        key: '7poao',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 1,
          },
        ],
        data: {},
      },
      {
        key: '6gci3',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 2,
          },
        ],
        data: {},
      },
    ],
  },
  legacyImage2: {
    entityMap: {},
    blocks: [
      {
        key: '5g8yu',
        text: 'Is this the right way to define atomic blocks?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '3ov91',
        text: '',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {
          type: 'IMAGE',
          item: {
            file_name: '20',
            source: 'static',
            url: 'https://unsplash.it/500/500?image=20',
          },
        },
      },
    ],
  },
  legacyImage: {
    entityMap: {
      '0': {
        type: 'IMAGE',
        mutability: 'IMMUTABLE',
        data: {
          src: {
            original_file_name: 'a27d24_5a98b777b0dd4c518ce70744ad44f630~mv2_d_4600_3903_s_4_2.jpg',
            file_name: 'a27d24_5a98b777b0dd4c518ce70744ad44f630~mv2_d_4600_3903_s_4_2.jpg',
            width: 4600,
            height: 3903,
          },
          size: 'fullWidth',
        },
      },
    },
    blocks: [
      {
        key: 'ov8f',
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
      },
    ],
  },
  image: {
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-image',
        mutability: 'IMMUTABLE',
        data: {
          src: {
            width: 960,
            height: 720,
            file_name: 'a27d24_3427f118d84444dbbb01c684ec4a82da~mv2.png',
            original_file_name: 'blob',
          },
          isLoading: false,
        },
      },
    },
    blocks: [
      {
        key: '7euc6',
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
      },
    ],
  },
  'gallery (old format)': {
    blocks: [
      {
        key: 'fjjon',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '1oo8o',
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
      },
      {
        key: '7bumu',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-gallery',
        mutability: 'IMMUTABLE',
        data: {
          items: [
            {
              metadata: {
                height: 3032,
                width: 2021,
                processedByConsumer: true,
                link: {
                  url: 'wix.com',
                  rel: 'nofollow',
                  target: '_blank',
                },
              },
              itemId: 'aa0c3adcc23504ac822d5c3ed5f3b6a1',
              url: '8bb438_6ad0d6b1ab9b4f8ea4f93389a3d68a4d.jpg',
              selected: false,
            },
            {
              metadata: {
                height: 1280,
                width: 1920,
                processedByConsumer: true,
                link: {
                  url: 'google.com',
                  rel: 'nofollow',
                  target: '_blank',
                },
              },
              itemId: 'be138fdc7f94fcbfc74f791c187de19f',
              url: '8bb438_c69ce4f9e2a2474586da85b85bfac20b.jpg',
              selected: false,
            },
            {
              metadata: {
                height: 2126,
                width: 1695,
                processedByConsumer: true,
                link: {
                  url: 'apple.com',
                  rel: 'nofollow',
                  target: '_blank',
                },
              },
              itemId: '0d134f293b71f7c0a9638c5f1a8435e5',
              url: '8bb438_5b9f0c9151f24ba8a8ebdba378e260b7.jpg',
              selected: false,
            },
            {
              metadata: {
                height: 3727,
                width: 5600,
                processedByConsumer: true,
                link: {
                  url: 'reddit.com',
                  rel: 'nofollow',
                  target: '_blank',
                },
              },
              itemId: 'b091d8ac038d07476546bef2475a7b03',
              url: '8bb438_e353d9a6ec324041a17a28d10e21819d.jpg',
              selected: false,
            },
            {
              metadata: {
                height: 2247,
                width: 3370,
                processedByConsumer: true,
                link: {
                  url: 'goodreads.com',
                  rel: 'nofollow',
                  target: '_blank',
                },
              },
              itemId: '22bd08049c2170953944eb0647327544',
              url: '8bb438_138ba4f7bc6a479daac72b6a59aba09c.jpg',
              selected: false,
            },
            {
              metadata: {
                height: 5472,
                width: 3648,
                processedByConsumer: true,
              },
              itemId: '2a37fa063861660e7850eb82d62914ee',
              url: '8bb438_13b27c8ed9084ae6a7526be845547661.jpg',
              selected: false,
            },
          ],
          styles: {
            galleryLayout: 2,
            gallerySizeType: 'px',
            gallerySizePx: 300,
            galleryMargin: 0,
            oneRow: false,
            cubeRatio: 1,
            galleryThumbnailsAlignment: 'bottom',
            isVertical: false,
            numberOfImagesPerRow: 3,
            imageMargin: 20,
            thumbnailSpacings: 0,
            cubeType: 'fill',
            enableInfiniteScroll: 1,
            titlePlacement: 'SHOW_ON_HOVER',
            allowHover: false,
            itemClick: 'link',
            fullscreen: false,
            showArrows: false,
            gridStyle: 1,
            loveButton: false,
            allowSocial: false,
            allowDownload: false,
            thumbnailSize: 120,
            gotStyleParams: true,
          },
          config: {
            alignment: 'center',
            size: 'content',
            layout: 'small',
            spacing: 0,
          },
        },
      },
    },
  },
  'gallery (new format)': {
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-gallery',
        mutability: 'IMMUTABLE',
        data: {
          items: [
            {
              itemId: 'f151933b-129e-11e9-8c97-12efbd0b6636',
              mediaUrl: '002cd4_2d48efc3227e47b3945a682eac7f3ae1~mv2_d_2869_3586_s_4_2.jpg',
              orderIndex: 1520763833.221,
              metaData: {
                createdOn: 1520763833222,
                height: 3586,
                width: 2869,
                lastModified: 1520763833222,
                name: '002cd4_2d48efc3227e47b3945a682eac7f3ae1~mv2_d_2869_3586_s_4_2.jpg',
                fileName: '13x2869.jpg',
                title: '',
                link: {
                  type: 'wix',
                  target: '_blank',
                  data: {
                    type: 'ExternalLink',
                    target: '_blank',
                    url: 'https://wix.com',
                  },
                },
                sourceName: 'private',
                tags: [],
                isDemo: true,
                description: '',
              },
              directLink: {
                url: 'https://wix.com',
                target: '_blank',
              },
            },
            {
              itemId: 'f15208e3-129e-11e9-8c97-12efbd0b6636',
              mediaUrl: '002cd4_bbd8be6bbeee46c48221e45c3a9a589f~mv2_d_3000_2000_s_2.jpg',
              orderIndex: 1520763833.222,
              metaData: {
                createdOn: 1520763833224,
                height: 2000,
                width: 3000,
                lastModified: 1520763833224,
                name: '002cd4_bbd8be6bbeee46c48221e45c3a9a589f~mv2_d_3000_2000_s_2.jpg',
                fileName: '11x3000.jpg',
                title: 'From Wetlands To Canals And Dams Amsterdam Is Alive',
                link: {
                  type: 'wix',
                  target: '_blank',
                  data: {
                    type: 'ExternalLink',
                    target: '_blank',
                    url: 'https://google.com',
                  },
                },
                sourceName: 'private',
                tags: [],
                isDemo: true,
                description:
                  'Many people has the notion that enlightenment is one state. Many also believe that when it is attained, a person is forever in that state.\n\nThe following is not a definitive article on this subject. It is just an expression of my own thoughts.\n\nMy opinion is that enlightenment is not just one state but is a progressive and gradual establishing of states of consciousness.\n\nI, myself have not reach the end of the road. But from years on a spiritual quest, I can safely say that enlightenment happens in a series or stages of self-realisations and self-discoveries.\n\nUsually there is a difference between an initial awakening and a later stabilisation of that stage that happens through practice or experiences. The initial awakenings are new discoveries about the dynamics of consciousness, while the stabilisation is the assimilation of what is being discovered into one’s life experience. Sometimes, a new discovery can completely over-rule or modify upon an older one.\n\nAlmost all stages of enlightenment can be said to be associated with Presence. However, the enlightening Presence comes in various degrees of intensity and clarity. The degree of intensity is directly dependent on the level and depth of one’s clarity as well as one’s realisations/discoveries.\n\nAlso, as one progresses along, the relationship or connections of oneself to the universe and existence at large also becomes clearer.\n\nBelow very briefly illustrates the progressive and stage-based nature of enlightenment:\n\nWhen one first begin meditating, one may first experience the all-pervading Presence. This Presence, is most often experienced when thoughts are momentarily suspended. This Presence which exists in the Eternal Present Moment is our true self.\n\nHowever such an experience can only be classified as an awakening to the true self.. which is no-self. This is because, after the meditation, the Presence seems to have disappeared. One cannot understand and find the connection of presence to our everyday life. Therefore one will have difficulty re-acquiring the Presence. And it takes many stages and series of realisation to understand the relationship of Presence to our phenomenal world. It can be said that the prolonged sustaining of Presence is dependent on the stages and depth of realisation.\n\nAlso, during the earlier stages we may mistaken another state to be the pure presence. For example, we may mistaken ‘I AM’ for pure presence. This is because the thinking mind has created a reflective image of Pure Presence. This reflection of the absolute is ‘I AM’.\n\nUsually, in order to pass through the ‘I AM’ stage, the person must move unto even deeper understandings. These understandings may include realising that one’s personality is not the doer of action. This stage may persist for a while before the person realises the illusion of subject-object division. This stage involves recognising the hypnotic impression of there being an observer and the being observed. Here is where one begins to see through the illusionary nature of our phenomenal world.\n\nI cannot comment on the stages before me as they are beyond me. Nevertheless, one can still see from the above description that enlightenment is not so straight-forward after all.\n\nFor your necessary discernment. Thank you for reading.',
              },
              directLink: {
                url: 'https://google.com',
                target: '_blank',
              },
            },
            {
              itemId: 'f1522b2e-129e-11e9-8c97-12efbd0b6636',
              mediaUrl: '002cd4_769319a2d138444cb19990885128f2c7~mv2_d_3000_2000_s_2.jpg',
              orderIndex: 1520763833.223,
              metaData: {
                createdOn: 1520763833224,
                height: 2000,
                width: 3000,
                lastModified: 1520763833224,
                name: '002cd4_769319a2d138444cb19990885128f2c7~mv2_d_3000_2000_s_2.jpg',
                fileName: '12x3000.jpg',
                title: 'test',
                link: {
                  type: 'none',
                  target: '_blank',
                },
                sourceName: 'private',
                tags: [],
                isDemo: true,
                description: '',
              },
              directLink: {},
            },
          ],
          config: { layout: 'small' },
        },
      },
    },
    blocks: [
      {
        key: 'ov8f',
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
      },
    ],
  },
  full: {
    entityMap: {
      '4': {
        type: 'wix-draft-plugin-html',
        mutability: 'IMMUTABLE',
        data: {
          src: 'https://www.youtube.com/embed/owsfdh4gxyc',
          config: {
            width: 200,
            height: 200,
            safe: true,
            isSrc: true,
          },
        },
      },
      '5': {
        type: 'wix-draft-plugin-html',
        mutability: 'IMMUTABLE',
        data: {
          src: 'https://www.youtube.com/embed/owsfdh4gxyc',
          srcType: 'url',
          config: {
            width: 500,
            height: 200,
            safe: true,
          },
        },
      },
      '6': {
        type: 'wix-draft-plugin-divider',
        mutability: 'IMMUTABLE',
        data: {
          type: 'dashed',
          config: {
            size: 'medium',
          },
        },
      },
    },
    blocks: [
      {
        key: '9gm3s',
        text:
          'Spicy jalapeno #bacon ipsum dolor amet kevin shank ground round, andouille tail shoulder venison strip steak biltong pastrami alcatra ribeye. Porchetta doner tail brisket chicken. Shank jerky flank, pastrami frankfurter hamburger burgdoggen filet mignon salami pork chop. Jerky swine short loin picanha porchetta, prosciutto short ribs jowl chuck burgdoggen brisket turkey.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'ov8f',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 6,
          },
        ],
        data: {},
      },
      {
        key: 'ov8w',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 4,
          },
        ],
        data: {},
      },
      {
        key: 'ov8t',
        text: ' ',
        type: 'atomic',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 1,
            key: 5,
          },
        ],
        data: {},
      },
      {
        key: 'e23a8',
        text:
          'Meatball.com rump tri-tip short ribs frankfurter chuck. Salami turkey ham, ball tip shankle chicken pork jerky venison beef ribs pastrami sausage bresaola. Beef ribs pork salami fatback tenderloin cupim, picanha porchetta pancetta hamburger pig pork loin chuck jerky bresaola. T-bone biltong landjaeger ham hock meatball tri-tip pancetta kevin chicken turducken drumstick tenderloin beef ribs tail. Sausage t-bone ham hock, bacon chicken jowl venison turkey bresaola tongue hamburger.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '5g8yu',
        text:
          'Biltong landjaeger andouille, doner prosciutto tri-tip sirloin shank. Ribeye capicola biltong pastrami burgdoggen. Filet mignon kielbasa capicola landjaeger pig hamburger, corned beef meatloaf swine meatball. Frankfurter brisket rump, pork fatback strip steak boudin cupim landjaeger sirloin venison pastrami cow pork chop chuck.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  },
  codeBlock: {
    blocks: [
      {
        key: 'foo',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: 'envpb',
        text:
          'for (var i=1; i <= 20; i++)\n{ \n    if (i % 15 == 0) \n        console.log("FizzBuzz"); \n    else if (i % 3 == 0) \n        console.log("Fizz"); \n    else if (i % 5 == 0) \n        console.log("Buzz"); \n    else console.log(i);\n}',
        type: 'code-block',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '6b6mt',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },

  mentions: {
    blocks: [
      {
        key: 'foo',
        text: 'Hi @Vytenis Butkevičius!',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 3,
            length: 20,
            key: 0,
          },
        ],
        data: {},
      },
    ],
    entityMap: {
      0: {
        type: 'mention',
        mutability: 'SEGMENTED',
        data: {
          mention: {
            name: 'Vytenis Butkevičius',
            slug: 'vytenisb',
            id: '2068b184-6832-412f-abd4-31220fecd086',
          },
        },
      },
    },
  },
  map: {
    blocks: [
      {
        key: 'dvtg1',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '54hkp',
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
      },
      {
        key: '1ma4t',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'wix-draft-plugin-map',
        mutability: 'IMMUTABLE',
        data: {
          config: {
            size: 'content',
            alignment: 'center',
            width: 740,
            height: 650,
          },
          mapSettings: {
            address: 'Sarnath, Varanasi, Uttar Pradesh, India',
            locationDisplayName: 'Sarnath, Varanasi, Uttar Pradesh, India',
            lat: 25.3761664,
            lng: 83.02271029999997,
            zoom: 18,
            mode: 'satellite',
            isMarkerShown: true,
            isZoomControlShown: true,
            isStreetViewControlShown: true,
            isDraggingAllowed: true,
          },
        },
      },
    },
  },
  fileUpload: {
    blocks: [
      {
        key: 'djpvb',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: '907ro',
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
      },
      {
        key: 'ds8pr',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      0: {
        type: 'wix-draft-plugin-file-upload',
        mutability: 'IMMUTABLE',
        data: {
          config: {
            alignment: 'center',
            size: 'small',
          },
          name: 'file-sample_150kB.pdf',
          type: 'pdf',
          uRL: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
        },
      },
    },
  },
};

export default TestData;
