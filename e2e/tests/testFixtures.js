import { fixturesToTestOnSeo, fixtures } from './settings';

const testFixture = (cy, fixtureObj) => {
  const { fixture, plugins, additionalCommands } =
    typeof fixtureObj === 'string' ? { fixture: fixtureObj } : fixtureObj;

  return it(`render ${fixture}`, function() {
    cy.loadEditorAndViewer(fixture, plugins);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    cy.eyesCheckWindow(this.test.title);
  });
};

export const testFixtures = () => fixtures.forEach(testFixture);
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);
