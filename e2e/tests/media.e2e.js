/*global cy*/
import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  GALLERY_SETTINGS,
  GALLERY_IMAGE_SETTINGS,
  IMAGE_SETTINGS,
  GIPHY_PLUGIN,
} from '../cypress/dataHooks';
import { DEFAULT_DESKTOP_BROWSERS } from './settings';

const eyesOpen = ({
  test: {
    parent: { title },
  },
}) =>
  cy.eyesOpen({
    appName: 'Plugins',
    testName: title,
    browser: DEFAULT_DESKTOP_BROWSERS,
  });

describe('plugins', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('image', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadEditorAndViewer('images');
    });

    after(() => cy.eyesClose());

    it('render image toolbar and settings', function() {
      cy.openImageSettings();
      cy.get(`[data-hook=${IMAGE_SETTINGS.PREVIEW}]:first`);
      cy.eyesCheckWindow(this.test.title + ' - settings');
      cy.addImageTitle();
      cy.eyesCheckWindow(this.test.title + ' - add image title');
      cy.editImageTitle();
      cy.eyesCheckWindow(this.test.title + ' - in plugin editing');
      cy.openImageSettings(false).deleteImageTitle();
      cy.eyesCheckWindow(this.test.title + ' - delete image title');
      cy.openImageSettings(false).addImageLink();
      cy.eyesCheckWindow(this.test.title + ' - add a link');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeOriginal();
      cy.eyesCheckWindow(this.test.title + '  - plugin original size');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).shrinkPlugin(PLUGIN_COMPONENT.IMAGE);
      cy.eyesCheckWindow(this.test.title + '  - plugin toolbar');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeBestFit();
      cy.eyesCheckWindow(this.test.title + '  - plugin content size');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeFullWidth();
      cy.eyesCheckWindow(this.test.title + '  - plugin full width size');
    });
  });

  context('full screen', () => {
    before(function() {
      eyesOpen(this);
    });
    beforeEach('load editor', () => cy.switchToDesktop());
    after(() => cy.eyesClose());

    context('image full screen', () => {
      beforeEach('load editor', () => cy.loadEditorAndViewer('images'));

      it('expand image on full screen', function() {
        cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:last`)
          .parent()
          .click();
        cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
      });
    });

    context('gallery full screen', () => {
      beforeEach('load editor', () =>
        cy
          .loadEditorAndViewer('gallery')
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
      );

      it('expand gallery image on full screen', function() {
        cy.get(`[data-hook=${'image-item'}]`)
          .eq(2)
          .parent()
          .click();
        cy.get('#pgi65a6266ba23a8a55da3f469157f15237_0 > div > div > div > a > div > canvas', {
          timeout: 10000,
        }).should('be.visible');
        cy.eyesCheckWindow({ tag: this.test.title, target: 'window', fully: false });
        cy.get(`[data-hook=${'nav-arrow-next'}]`).click({ force: true });
        cy.get('#pgiea8ec1609e052b7f196935318316299d_1 > div > div > div > a > div > canvas', {
          timeout: 10000,
        }).should('be.visible');
        cy.get(`[data-hook=${'fullscreen-close-button'}]`).click();
        // cy.eyesCheckWindow({ tag: 'closed fullscreen', target: 'window', fully: false });
      });
    });
  });

  context('gallery', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render gallery plugin', function() {
      cy.loadEditorAndViewer('gallery')
        .get(`[data-hook=${'image-item'}]:first`)
        .get(`[data-hook=${'image-item'}]`)
        .eq(1);
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY).shrinkPlugin(PLUGIN_COMPONENT.GALLERY);
      cy.waitForDocumentMutations();
      cy.eyesCheckWindow(this.test.title + ' toolbar');
      cy.openGalleryAdvancedSettings();
      cy.eyesCheckWindow(this.test.title + ' settings');
    });

    it('render gallery out of view', function() {
      cy.loadEditorAndViewer('gallery-out-of-view');
      cy.get(`[data-hook=${PLUGIN_COMPONENT.GALLERY}]`).eq(3);
      cy.eyesCheckWindow(`${this.test.title} - out of view`);
      cy.scrollTo('bottom');
      cy.waitForDocumentMutations();
      cy.eyesCheckWindow(`${this.test.title} - in view`);
    });

    context('organize media', () => {
      it('allow to manipulate the media items', function() {
        const firstImage = `[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`;
        const anyImage = `[data-hook=${GALLERY_SETTINGS.IMAGE}]`;
        cy.loadEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin(PLUGIN_COMPONENT.GALLERY)
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .get(firstImage)
          .get(anyImage)
          .eq(1);
        cy.eyesCheckWindow(this.test.parent.title + ' - render settings');
        cy.get(firstImage).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`);
        cy.eyesCheckWindow(this.test.parent.title + ' - select an item');
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - select all items');
        cy.get(`[data-hook=${GALLERY_SETTINGS.DESELECT}]`).click();
        cy.dragAndDrop(firstImage, anyImage, 1);
        cy.eyesCheckWindow(this.test.parent.title + ' - deselect items');
        cy.get(firstImage).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.get(firstImage);
        cy.eyesCheckWindow(this.test.parent.title + ' - delete an item');
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - delete all items');
      });
    });

    context('media settings', () => {
      it('allow to update media content', function() {
        cy.loadEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin(PLUGIN_COMPONENT.GALLERY)
          .get(`[data-hook=${'image-item'}]:first`)
          .get(`[data-hook=${'image-item'}]`)
          .eq(1)
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .openGalleryImageSettings()
          .get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.eyesCheckWindow(this.test.parent.title + ' - render item settings');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.TITLE}]`).type('Amazing Title');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK}]`).type('Stunning.com');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK_TARGET}]`).click();
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK_NOFOLLOW}]`).click();
        cy.eyesCheckWindow(this.test.parent.title + ' - enter image settings');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DONE}]:first`).click();
        cy.openGalleryImageSettings();
        cy.eyesCheckWindow(this.test.parent.title + ' - settings saved & title shows on image ');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.eyesCheckWindow(this.test.parent.title + ' - delete a media item');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_SETTINGS.UPLOAD}]`);
        cy.eyesCheckWindow(this.test.parent.title + ' - delete all items');
      });
      // TODO: title and link image tests
      // // eslint-disable-next-line mocha/no-skipped-tests
      // it.skip('allow to add a title', function() {
      //   cy.addGalleryImageTitle().checkTitle();
      //   cy.eyesCheckWindow(this.test.parent.title + ' - ' + this.test.title);
      // });
    });
  });

  context('video', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadEditorAndViewer('empty');
    });

    after(() => cy.eyesClose());

    it('render upload modal', function() {
      cy.openVideoUploadModal();
      cy.eyesCheckWindow(this.test.title);
    });

    it('add a video from URL', function() {
      cy.openVideoUploadModal().addVideoFromURL();
      cy.openPluginToolbar(PLUGIN_COMPONENT.VIDEO).shrinkPlugin(PLUGIN_COMPONENT.VIDEO);
      cy.focusEditor()
        .type('{uparrow}') //try to fix bug where sometimes it doesn't type
        .type('{uparrow}')
        .type('Will this fix the flakiness?');
      cy.waitForVideoToLoad();
      cy.eyesCheckWindow(this.test.title);
    });

    it('add a custom video', function() {
      cy.openVideoUploadModal().addCustomVideo();
      cy.openPluginToolbar(PLUGIN_COMPONENT.VIDEO).shrinkPlugin(PLUGIN_COMPONENT.VIDEO);
      cy.focusEditor()
        .type('{uparrow}') //try to fix bug where sometimes it doesn't type
        .type('{uparrow}')
        .type('Will this fix the flakiness?');
      cy.waitForVideoToLoad();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('soundcloud', () => {
    before(function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadEditorAndViewer('empty');
    });

    after(() => cy.eyesClose());

    it('render upload modal', function() {
      cy.openSoundCloudModal();
      cy.eyesCheckWindow(this.test.title);
    });

    it('add a soundcloud URL', function() {
      cy.openSoundCloudModal().addSoundCloud();
      cy.shrinkPlugin(PLUGIN_COMPONENT.SOUND_CLOUD);
      cy.focusEditor()
        .type('{uparrow}') //try to fix bug where sometimes it doesn't type
        .type('{uparrow}')
        .type('Will this fix the flakiness?');
      cy.waitForVideoToLoad();
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('giphy', () => {
    before('load editor', function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render giphy plugin toolbar', function() {
      cy.loadEditorAndViewer('giphy');
      cy.openPluginToolbar(PLUGIN_COMPONENT.GIPHY).clickToolbarButton(
        PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER
      );
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.REPLACE}][tabindex=0]`).click();
      cy.get(`[data-hook=${GIPHY_PLUGIN.UPLOAD_MODAL}] img`);
      cy.eyesCheckWindow(this.test.title);
    });

    it('should auto focus on add gif', function() {
      cy.loadEditorAndViewer('empty').focusEditor();
      cy.addGif().get('[data-hook=giphyPluginToolbar]');
      cy.window().then(win => {
        win.__CONTENT_SNAPSHOT__ = { mock: true };
      });
      cy.eyesCheckWindow(this.test.title);
    });
  });

  context('emoji', () => {
    before('load editor', function() {
      eyesOpen(this);
    });

    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    after(() => cy.eyesClose());

    it('render some emojies', function() {
      cy.loadEditorAndViewer('empty');
      cy.get(`button[data-hook=${PLUGIN_COMPONENT.EMOJI}]`).click();
      cy.eyesCheckWindow('render emoji modal');
      cy.get(`[data-hook=emoji-5]`).click();
      cy.get(`[data-hook=emoji-group-5]`).click();
      cy.get(`[data-hook=emoji-95]`).click();
      cy.get(`[data-hook=emoji-121]`).click();
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
