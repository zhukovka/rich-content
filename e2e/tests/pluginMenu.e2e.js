/*global cy*/
import { DEFAULT_DESKTOP_BROWSERS } from './settings';

describe('plugin menu test', () => {
  context('plugin menu', () => {
    before(function() {
      cy.eyesOpen({
        appName: 'pluginMenu',
        testName: this.test.parent.title,
        browser: DEFAULT_DESKTOP_BROWSERS,
      });
    });

    beforeEach(() => cy.clearTestApptoolbarConfig());
    after(() => cy.eyesClose());

    it('should render horizontal plugin menu', function() {
      cy.setHorizontalPluginMenu();
      cy.loadEditorAndViewer('newLines')
        .focusEditor()
        .openSideToolbar();
      cy.eyesCheckWindow(this.test.title);
    });
    it('should render advanced plugin menu', function() {
      cy.setAdvancedPluginMenu();
      cy.loadEditorAndViewer('newLines')
        .focusEditor()
        .openSideToolbar();
      cy.eyesCheckWindow(this.test.title);
    });
    it('should render advanced plugin menu with search', function() {
      cy.setPluginMenuSearch();
      cy.loadEditorAndViewer('newLines')
        .focusEditor()
        .openSideToolbar();
      cy.eyesCheckWindow(this.test.title);
    });
    it('should render advanced plugin menu with sections', function() {
      cy.setPluginMenuSectionSplited();
      cy.loadEditorAndViewer('newLines')
        .focusEditor()
        .openSideToolbar();
      cy.eyesCheckWindow(this.test.title);
    });
    it('should render advanced plugin menu with sections and search', function() {
      cy.setPluginMenuSectionSplited();
      cy.setPluginMenuSearch();
      cy.loadEditorAndViewer('newLines')
        .focusEditor()
        .openSideToolbar();
      cy.eyesCheckWindow(this.test.title);
    });
  });
});
