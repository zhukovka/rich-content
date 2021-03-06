/*global Cypress, cy*/
require('cypress-plugin-snapshots/commands');
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
addMatchImageSnapshotCommand();
import {
  INLINE_TOOLBAR_BUTTONS,
  PLUGIN_TOOLBAR_BUTTONS,
  IMAGE_SETTINGS,
  GALLERY_SETTINGS,
  VIDEO_PLUGIN,
  HTML_PLUGIN,
  PLUGIN_COMPONENT,
  STATIC_TOOLBAR_BUTTONS,
  SETTINGS_PANEL,
} from '../dataHooks';
import { defaultConfig } from '../testAppConfig';

// Viewport size commands
const resizeForDesktop = () => cy.viewport('macbook-15');
const resizeForMobile = () => cy.viewport('iphone-6');

const buildQuery = params => {
  const parameters = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      const res = value === true ? key : `${key}=${value}`;
      parameters.push(res);
    }
  });
  if (parameters.length === 0) return '';
  return '?' + parameters.join('&');
};

const getUrl = (componentId, fixtureName = '', config = {}) => {
  const testAppConfig = JSON.stringify({
    ...defaultConfig,
    ...config,
  });
  return `/${componentId}${fixtureName ? '/' + fixtureName : ''}${buildQuery({
    mobile: isMobile,
    hebrew: isHebrew,
    seoMode: isSeoMode,
    testAppConfig,
  })}`;
};

const run = (app, fixtureName, plugins) => {
  cy.visit(getUrl(app, fixtureName, plugins)).then(() => {
    disableTransitions();
    findEditorElement();
    hideAllTooltips();
  });
};

let isMobile = false;
let isHebrew = false;
let isSeoMode = false;

Cypress.Commands.add('switchToMobile', () => {
  isMobile = true;
  resizeForMobile();
});

Cypress.Commands.add('switchToDesktop', () => {
  isMobile = false;
  resizeForDesktop();
});

Cypress.Commands.add('switchToSeoMode', () => {
  isSeoMode = true;
});

Cypress.Commands.add('switchToHebrew', () => {
  isHebrew = true;
});

Cypress.Commands.add('switchToEnglish', () => {
  isHebrew = false;
});

function disableTransitions() {
  Cypress.$('head').append('<style> * {transition: none !important;}</style>');
}

function hideAllTooltips() {
  cy.get('[data-id="tooltip"]', { timeout: 300000 }).invoke('hide'); //uses jquery to set display: none
}

function findEditorElement() {
  cy.get('.DraftEditor-root', { timeout: 300000 });
}

Cypress.Commands.add('loadEditorAndViewer', (fixtureName, config) =>
  run('rce', fixtureName, config)
);
Cypress.Commands.add('loadIsolatedEditorAndViewer', fixtureName =>
  run('rce-isolated', fixtureName)
);
Cypress.Commands.add('loadWrapperEditorAndViewer', fixtureName => run('wrapper', fixtureName));

Cypress.Commands.add('loadTestAppOnSsr', (fixtureName, compName) => {
  cy.request(getUrl(compName, fixtureName))
    .its('body')
    .then(html => {
      // remove the application code bundle
      const _html = html.replace('<script src="/index.bundle.js"></script>', '');
      cy.state('document').write(_html);
    });
});

Cypress.Commands.add('matchContentSnapshot', () => {
  if (Cypress.env('MATCH_CONTENT_STATE'))
    cy.window()
      .its('__CONTENT_SNAPSHOT__')
      .toMatchSnapshot();
});

Cypress.Commands.add('matchSnapshots', options => {
  cy.matchImageSnapshot(options).matchContentSnapshot();
});

// Editor commands

Cypress.Commands.add('enterText', text => {
  cy.getEditor().type(text);
});

Cypress.Commands.add('enterParagraphs', paragraphs => {
  cy.enterText(paragraphs.join('{enter}'));
});

Cypress.Commands.add('newLine', () => {
  cy.enterText('{enter}');
});

Cypress.Commands.add('blurEditor', () => {
  cy.getEditor()
    .blur()
    .get('[data-hook=inlineToolbar]')
    .should('not.visible');
});

Cypress.Commands.add('getEditor', () => {
  cy.get('[contenteditable="true"]');
});

Cypress.Commands.add('focusEditor', () => {
  cy.getEditor().focus();
});

Cypress.Commands.add(
  'typeAllAtOnce',
  {
    prevSubject: 'element',
  },
  ($subject, value) => {
    const el = $subject[0];
    el.value = value;
    return cy.wrap($subject).type('t{backspace}');
  }
);

Cypress.on('window:before:load', win => {
  // noinspection JSAnnotator
  delete win.IntersectionObserver; // eslint-disable-line fp/no-delete
  win.IntersectionObserver = class IntersectionObserverMock {
    constructor(cb, options) {
      this.cb = cb;
      this.options = options;
    }

    thresholds = [0];
    root = win;
    rootMargin = '0px';
    observe = element =>
      this.cb([
        {
          boundingClientRect: element.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: element.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: {},
          target: element,
          time: new Date().getTime(),
        },
      ]);
    unobserve = () => null;
    disconnect = () => {};
  };
});

function getTextElments(rootElement) {
  let textElement,
    offset = 0;
  const textElements = [],
    textOffsets = [];
  const walk = rootElement.ownerDocument.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  while ((textElement = walk.nextNode())) {
    textElements.push(textElement);
    offset += textElement.length;
    textOffsets.push(offset);
  }
  return offset => {
    const i = textOffsets.findIndex(v => v > offset);
    return { element: textElements[i], offset: i === 0 ? offset : offset - textOffsets[i - 1] };
  };
}

Cypress.Commands.add('setSelection', (start, offset) => {
  cy.focusEditor().then(args => {
    const getTextElmentAndLocalOffset = getTextElments(args[0]);
    const document = args[0].ownerDocument;
    const range = document.createRange();
    const startObj = getTextElmentAndLocalOffset(start);
    range.setStart(startObj.element, startObj.offset);
    const endObj = getTextElmentAndLocalOffset(start + offset);
    range.setEnd(endObj.element, endObj.offset);
    document.getSelection().removeAllRanges(range);
    document.getSelection().addRange(range);
  });
});

Cypress.Commands.add('moveCursorToStart', () => {
  cy.focusEditor().type('{selectall}{uparrow}');
});

Cypress.Commands.add('moveCursorToEnd', () => {
  cy.focusEditor().type('{selectall}{downarrow}');
});

Cypress.Commands.add('setTextStyle', (buttonSelector, selection) => {
  if (selection) {
    cy.setSelection(selection[0], selection[1]);
  }
  cy.get(`[data-hook=inlineToolbar] [data-hook=${buttonSelector}]`).click();
});

Cypress.Commands.add('increaseIndent', selection => {
  cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.INCREASE_INDENT, selection);
});

Cypress.Commands.add('decreaseIndent', selection => {
  cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.DECREASE_INDENT, selection);
});

Cypress.Commands.add('setLink', (selection, link) => {
  cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.LINK, selection)
    .get(`[data-hook=linkPanelContainer] [data-hook=linkPanelInput]`)
    .type(link)
    .get(`[data-hook=linkPanelContainerDone]`)
    .click();
});

Cypress.Commands.add('setLinkSettings', () => {
  cy.clickToolbarButton(INLINE_TOOLBAR_BUTTONS.LINK)
    .get(`[data-hook=linkPanelContainer] [data-hook=linkPanelRelCheckbox]`)
    .click()
    .get(`[data-hook=linkPanelContainerDone]`)
    .click();
});

Cypress.Commands.add('setAlignment', alignment => {
  cy.setTextStyle(INLINE_TOOLBAR_BUTTONS.ALIGNMENT).setTextStyle(alignment);
});

function setInlineToolbarMenueItem(item, selection, buttonIndex) {
  cy.setTextStyle(item, selection)
    .get('.ReactModalPortal')
    .find('button')
    .eq(buttonIndex)
    .click();
}

Cypress.Commands.add('setColor', (buttonIndex = 3, selection) => {
  setInlineToolbarMenueItem(INLINE_TOOLBAR_BUTTONS.COLOR, selection, buttonIndex);
});

Cypress.Commands.add('setLineSpacing', (buttonIndex = 3, selection) => {
  setInlineToolbarMenueItem(INLINE_TOOLBAR_BUTTONS.LINE_SPACING, selection, buttonIndex);
});

Cypress.Commands.add('openSideToolbar', () => {
  cy.get('[aria-label="Plugin Toolbar"]').click();
  cy.get('[data-hook="floatingAddPluginMenu"]');
});

Cypress.Commands.add('openAddPluginModal', () => {
  cy.get('[data-hook="addPluginButton"]').click();
  cy.get('[data-hook="addPluginMenu"]');
});

Cypress.Commands.add('openImageSettings', (shouldOpenToolbar = true) => {
  shouldOpenToolbar && cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE);
  cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.SETTINGS);
  cy.get('[data-hook="imageSettings"]');
});

Cypress.Commands.add('openMapSettings', () => {
  cy.get(`[data-hook=${PLUGIN_COMPONENT.MAP}]:first`)
    .parent()
    .click();
  cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.SETTINGS);
  cy.get('[data-hook="mapSettings"]');
});

Cypress.Commands.add('openGalleryAdvancedSettings', () => {
  cy.get(`[data-hook=${PLUGIN_COMPONENT.GALLERY}]:first`)
    .parent()
    .click();
  cy.get(`[data-hook=${PLUGIN_TOOLBAR_BUTTONS.ADV_SETTINGS}]:first`).click();
});

Cypress.Commands.add('shrinkPlugin', dataHook => {
  cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER)
    .get(`[data-hook=${dataHook}]:first`, { timeout: 15000 })
    .should('have.css', 'width', '350px');
});

Cypress.Commands.add('pluginSizeBestFit', () => {
  cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.BEST_FIT);
});

Cypress.Commands.add('pluginSizeFullWidth', () => {
  cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.FULL_WIDTH);
});

Cypress.Commands.add('pluginSizeOriginal', () => {
  cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.ORIGINAL);
});

Cypress.Commands.add('clickToolbarButton', buttonName => {
  cy.get(`button[data-hook=${buttonName}][tabindex=0]`).click({
    force: true, //fixes element getting detached from dom and not clicking (maybe because of click scroll strategy)
  });
});

Cypress.Commands.add('openGallerySettings', () => {
  cy.get('[data-hook="manage_media_Tab"]').click();
});

Cypress.Commands.add('openGalleryImageSettings', () => {
  cy.get(`[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`).click();
  cy.get(`[data-hook=${GALLERY_SETTINGS.EDIT_IMAGE}]`).click();
});

Cypress.Commands.add('addImageTitle', () => {
  cy.get(`[data-hook=${IMAGE_SETTINGS.CAPTION}]`)
    .click()
    .type('Title')
    .get(`[data-hook=${SETTINGS_PANEL.DONE}]`)
    .click();
});

Cypress.Commands.add('editImageTitle', () => {
  cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:first`)
    .find('input')
    .click()
    .type(' - In Plugin Editing')
    .blur();
});

Cypress.Commands.add('deleteImageTitle', () => {
  cy.get(`[data-hook=${IMAGE_SETTINGS.CAPTION}]`)
    .click()
    .clear()
    .get(`[data-hook=${SETTINGS_PANEL.DONE}]`)
    .click();
});

Cypress.Commands.add('addGalleryImageTitle', (pluginToClick = null) => {
  cy.get(`[data-hook=${GALLERY_SETTINGS.TITLE}]`).type('Title');
  cy.get(`[data-hook=${SETTINGS_PANEL.DONE}]:first`).click({ multiple: true });
  cy.get(`[data-hook=${SETTINGS_PANEL.DONE}]`).click();
  pluginToClick &&
    cy
      .get(`[data-hook=${pluginToClick}]:first`)
      .parent()
      .click();
});

Cypress.Commands.add('checkTitle', () => {
  cy.get('[data-hook=galleryViewer]:first')
    .parent()
    .click();
  cy.get(`[data-hook=${GALLERY_SETTINGS.VIEWER_IMAGE}]:first`);
});

Cypress.Commands.add('addImageLink', () => {
  cy.get(`[data-hook=${IMAGE_SETTINGS.LINK}]`)
    .click()
    .type('www.wix.com')
    .get(`[data-hook=${SETTINGS_PANEL.DONE}]`)
    .click()
    .wait(200);
  // .get('href=www.wix.com');
});

Cypress.Commands.add('alignImage', alignment => {
  let button;
  switch (alignment) {
    case 'left':
      button = PLUGIN_TOOLBAR_BUTTONS.SMALL_LEFT;
      break;
    case 'center':
      button = PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER;
      break;
    case 'right':
    default:
      button = PLUGIN_TOOLBAR_BUTTONS.SMALL_RIGHT;
  }
  cy.get('[data-hook=imageViewer]:first')
    .parent()
    .click();
  cy.clickToolbarButton(button);
});

Cypress.Commands.add('openPluginToolbar', plugin => {
  cy.get(`[data-hook*=${plugin}]`)
    .first()
    .parent()
    .click();
  cy.get('[data-hook*="PluginToolbar"]:first');
});

Cypress.Commands.add('openDropdownMenu', (selector = '') => {
  cy.get('button[role=combobox][data-hook=baseToolbarButton_type]').click();
  if (selector) {
    cy.get(selector).click();
  }
});

Cypress.Commands.add('openVideoUploadModal', () => {
  cy.clickOnStaticButton(STATIC_TOOLBAR_BUTTONS.VIDEO);
});

Cypress.Commands.add('openSoundCloudModal', () =>
  cy.clickOnStaticButton(STATIC_TOOLBAR_BUTTONS.SOUND_CLOUD)
);
Cypress.Commands.add('openEmbedModal', modalType => cy.clickOnStaticButton(modalType));

Cypress.Commands.add('addGif', () => {
  cy.clickOnStaticButton(STATIC_TOOLBAR_BUTTONS.GIPHY);
  cy.get('[data-hook=giphyUploadModal] [role=button]')
    .first()
    .click();
});

Cypress.Commands.add('addSoundCloud', () => {
  cy.get(`[data-hook*=${'soundCloudUploadModalInput'}]`).type(
    'https://soundcloud.com/nlechoppa/camelot'
  );
  cy.get(`[data-hook*=${SETTINGS_PANEL.DONE}]`).click();
  cy.get(`[data-hook=${PLUGIN_COMPONENT.SOUND_CLOUD}]:first`)
    .parent()
    .click();
});

Cypress.Commands.add('addSocialEmbed', url => {
  cy.get(`[data-hook*=${'socialEmbedUploadModalInput'}]`).type(url);
  cy.get(`[data-hook*=${SETTINGS_PANEL.DONE}]`).click();
});

Cypress.Commands.add('addVideoFromURL', () => {
  cy.get(`[data-hook*=${VIDEO_PLUGIN.INPUT}]`).type('https://youtu.be/BBu5codsO6Y');
  cy.get(`[data-hook*=${VIDEO_PLUGIN.ADD}]`).click();
  cy.get(`[data-hook=${PLUGIN_COMPONENT.VIDEO}]:first`)
    .parent()
    .click();
});

Cypress.Commands.add('clickOnStaticButton', dataHook =>
  cy.get(`[data-hook*=footerToolbar] [data-hook*=${dataHook}]`).click()
);

Cypress.Commands.add('addHtml', () => {
  cy.clickOnStaticButton(HTML_PLUGIN.STATIC_TOOLBAR_BUTTON);
  cy.get(`[data-hook*=${HTML_PLUGIN.INPUT}]`)
    .click()
    .clear();
  cy.get(`[data-hook*=${HTML_PLUGIN.INPUT}]`).typeAllAtOnce(
    // eslint-disable-next-line max-len
    '<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">The updates, insights and stories of the engineering challenges we encounter, and our way of solving them. Subscribe to our fresh, monthly newsletter and get these goodies right to your e-mail:<a href="https://t.co/0ziRSJJAxK">https://t.co/0ziRSJJAxK</a> <a href="https://t.co/nTHlsG5z2a">pic.twitter.com/nTHlsG5z2a</a></p>&mdash; Wix Engineering (@WixEng) <a href="https://twitter.com/WixEng/status/1076810144774868992?ref_src=twsrc%5Etfw">December 23, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>'
  );
  cy.get(`[data-hook*=${HTML_PLUGIN.UPDATE}]`).click();
});

Cypress.Commands.add('addCustomVideo', () => {
  cy.get(`[data-hook*=${VIDEO_PLUGIN.CUSTOM}]`).click();
  cy.get(`[data-hook=${PLUGIN_COMPONENT.VIDEO}]:first`)
    .parent()
    .click();
});

Cypress.Commands.add('dragAndDrop', (src, dest, elem = 0) => {
  cy.get(dest)
    .eq(elem)
    .then(target => {
      const dest = target[0].getBoundingClientRect();
      cy.get(src)
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { which: 1, pageX: dest.x + 50, pageY: dest.y + 20 })
        .trigger('mouseup', { force: true });
    });
});

Cypress.Commands.add('dragAndDropPlugin', (src, dest) => {
  const dataTransfer = new DataTransfer();
  cy.get(src)
    .trigger('mousedown')
    .trigger('dragstart', { dataTransfer })
    .get(dest)
    .trigger('dragenter', { dataTransfer })
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer });
});

Cypress.Commands.add('waitForVideoToLoad', { prevSubject: 'optional' }, () => {
  cy.get('[data-loaded=true]', { timeout: 15000 }).should('have.length', 2);
});

Cypress.Commands.add('waitForHtmlToLoad', () => {
  cy.get('iframe', { timeout: 15000 })
    .each($el => {
      cy.wrap($el)
        .its('0.contentDocument.body')
        .should('not.be.undefined');
    })
    .wait(4000);
});

Cypress.Commands.add('insertLinkAndEnter', url => {
  cy.focusEditor();
  cy.moveCursorToEnd()
    .type(url)
    .type('{enter}')
    .moveCursorToEnd()
    .wait(200);
});

Cypress.Commands.add('triggerLinkPreviewViewerUpdate', () => {
  cy.moveCursorToEnd();
  cy.focusEditor()
    .get('[data-hook=addPluginFloatingToolbar]')
    .should('be.visible');
});

Cypress.Commands.add('waitForDocumentMutations', () => {
  cy.document().then(async doc => {
    await waitForMutations(doc.body);
  });
});

function waitForMutations(container, { timeToWaitForMutation = 400 } = {}) {
  return new Promise(resolve => {
    let timeoutId = setTimeout(onDone, timeToWaitForMutation);

    const observer = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onDone, timeToWaitForMutation);
    });
    observer.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });

    function onDone() {
      clearTimeout(timeoutId);
      observer.disconnect();
      resolve();
    }
  });
}

Cypress.Commands.add('paste', (pastePayload, pasteType = 'text') => {
  cy.getEditor().then($destination => {
    const pasteEvent = Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
      clipboardData: {
        getData: (type = pasteType) => {
          return pastePayload;
        },
      },
    });
    $destination[0].dispatchEvent(pasteEvent);
  });
});

// disable screenshots in debug mode. So there is no diffrence to ci.
if (Cypress.browser.isHeaded) {
  const noop = () => {};
  Cypress.Commands.overwrite('matchImageSnapshot', noop);
}
