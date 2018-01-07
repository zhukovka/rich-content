/* eslint-disable */
const TestData = {
  onlyText : {
    "entityMap": {},
    "blocks": [ {
      "key": "5g8yu",
      "text": "Hello text only",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }]
  },
  legacyImage : {
    "entityMap": {
      "0": {
        "type": "IMAGE",
        "mutability": "IMMUTABLE",
        "data": {
          "item": {
            "file_name": "20",
            "source": "static",
            "url": "https://unsplash.it/500/500?image=20",
          }
        }
      },
    },
    "blocks": [{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }]
  },
  image : {
    "entityMap": {
      "0": {
        "type": "wix-draft-plugin-image",
        "mutability": "IMMUTABLE",
        "data": {
          "item": {
            "file_name": "20",
            "source": "static",
            "url": "https://unsplash.it/500/500?image=20",
            "title": "This is a title",
            "description": "This is the description"
          },
          "config": {
            "layout":"classic",
            "showTitle": true,
            "showDescription": true
          }
        }
      },
    },
    "blocks": [{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }]
  },
  legacyVideo : {
    "entityMap": {
      "0": {
        "type": "VIDEO-EMBED",
        "mutability": "IMMUTABLE",
        "data": {
          "src": "https://www.youtube.com/watch?v=eqZVIiD6wSg",
          "config": {"size": "content"}
        }
      },
    },
    "blocks": [{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }]
  },
  video : {
    "entityMap": {
      "0": {
        "type": "wix-draft-plugin-video",
        "mutability": "IMMUTABLE",
        "data": {
          "src": "https://www.youtube.com/watch?v=eqZVIiD6wSg"
        }
      },
    },
    "blocks": [{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }]
  },
  html : {
    "entityMap": {
      "0": {
        "type": "wix-draft-plugin-html",
        "mutability": "IMMUTABLE",
        "data": {
          "src": "https://www.youtube.com/embed/owsfdh4gxyc",
          "config": {
            "width": 200,
            "height": 200,
            "safe": true,
            "isSrc": true
          }
        }
      },
    },
    "blocks": [{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }]
  },
  divider : {
    "entityMap": {
      "0": {
        "type": "wix-draft-plugin-divider",
        "mutability": "IMMUTABLE",
        "data": {
          "type": "divider1",
          "config": {
            "width": 500
          },
        }
      },
    },
    "blocks": [{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }]
  },
  gallery : {
    "entityMap": {
      "0": {
        "type": "wix-draft-plugin-gallery",
        "mutability": "IMMUTABLE",
        "data": {
          "items": [
            {
              "src": "https://unsplash.it/300/300?image=20"
            },
            {
              "src": "https://unsplash.it/300/300?image=21"
            },
            {
              "src": "https://unsplash.it/300/300?image=22"
            },
            {
              "src": "https://unsplash.it/300/300?image=23"
            }

          ],
          "config": { "layout": "small" }
        }
      }
    },
    "blocks": [{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }]
  },
  full: {
    "entityMap": {
      "0": {
        "type": "image",
        "mutability": "IMMUTABLE",
        "data": {
          "item": {
            "file_name": "20",
            "source": "static",
            "url": "https://unsplash.it/500/500?image=20",
            "title": "This is a title",
            "description": "This is the description"
          },
          "config": {
            "layout":"classic",
            "showTitle": true,
            "showDescription": true
          }
        }
      },
      "1": {
        "type": "wix-draft-plugin-image",
        "mutability": "IMMUTABLE",
        "data": {
          "item": {
            "file_name": "20",
            "source": "static",
            "url": "https://unsplash.it/500/500?image=20",
            "title": "This is a title",
            "description": "This is the description"
          },
          "config": {
            "layout":"classic",
            "showTitle": true,
            "showDescription": true
          }
        }
      },
      "2": {
        "type": "wix-draft-plugin-gallery",
        "mutability": "IMMUTABLE",
        "data": {
          "items": [
            {
              "src": "https://unsplash.it/300/300?image=20"
            },
            {
              "src": "https://unsplash.it/300/300?image=21"
            },
            {
              "src": "https://unsplash.it/300/300?image=22"
            },
            {
              "src": "https://unsplash.it/300/300?image=23"
            }

          ],
          "config": {"layout":"small"}
        }
      },
      "3": {
        "type": "wix-draft-plugin-image",
        "mutability": "IMMUTABLE",
        "data": {
          "item": {
            "file_name": "20",
            "source": "static",
            "url": "https://unsplash.it/300/300?image=20",
            "title": "This is a title",
            "description": "This is the description"
          },
          "config": {
            "layout":"classic",
            "showTitle": true,
            "showDescription": true
          }
        }
      },
      "4": {
        "type": "wix-draft-plugin-html",
        "mutability": "IMMUTABLE",
        "data": {
          "src": "https://www.youtube.com/embed/owsfdh4gxyc",
          "config": {
            "width": 200,
            "height": 200,
            "safe": true,
            "isSrc": true
          }
        }
      },
      "5": {
        "type": "wix-draft-plugin-html",
        "mutability": "IMMUTABLE",
        "data": {
          "src": "https://www.youtube.com/embed/owsfdh4gxyc",
          "config": {
            "width": 500,
            "height": 200,
            "safe": true,
            "isSrc": true
          }
        }
      },
      "6": {
        "type": "wix-draft-plugin-divider",
        "mutability": "IMMUTABLE",
        "data": {
          "type": "divider1",
          "config": {
            "width": 500
          },
        }
      },
    },
    "blocks": [{
      "key": "9gm3s",
      "text": "Spicy jalapeno #bacon ipsum dolor amet kevin shank ground round, andouille tail shoulder venison strip steak biltong pastrami alcatra ribeye. Porchetta doner tail brisket chicken. Shank jerky flank, pastrami frankfurter hamburger burgdoggen filet mignon salami pork chop. Jerky swine short loin picanha porchetta, prosciutto short ribs jowl chuck burgdoggen brisket turkey.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    },{
      "key": "ov8f",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 6
      }],
      "data": {}
    },{
      "key": "ov8w",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 4
      }],
      "data": {}
    },{
      "key": "ov8t",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 5
      }],
      "data": {}
    },{
      "key": "ov7w",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 2
      }],
      "data": {}
    },{
      "key": "ov7z",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 3
      }],
      "data": {}
    }, {
      "key": "ov7r",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
      }],
      "data": {}
    }, {
      "key": "e23a8",
      "text": "Meatball.com rump tri-tip short ribs frankfurter chuck. Salami turkey ham, ball tip shankle chicken pork jerky venison beef ribs pastrami sausage bresaola. Beef ribs pork salami fatback tenderloin cupim, picanha porchetta pancetta hamburger pig pork loin chuck jerky bresaola. T-bone biltong landjaeger ham hock meatball tri-tip pancetta kevin chicken turducken drumstick tenderloin beef ribs tail. Sausage t-bone ham hock, bacon chicken jowl venison turkey bresaola tongue hamburger.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }, {
      "key": "ov7a",
      "text": " ",
      "type": "atomic",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 1
      }],
      "data": {}
    }, {
      "key": "5g8yu",
      "text": "Biltong landjaeger andouille, doner prosciutto tri-tip sirloin shank. Ribeye capicola biltong pastrami burgdoggen. Filet mignon kielbasa capicola landjaeger pig hamburger, corned beef meatloaf swine meatball. Frankfurter brisket rump, pork fatback strip steak boudin cupim landjaeger sirloin venison pastrami cow pork chop chuck.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
    }]
  }
};

export default TestData;
