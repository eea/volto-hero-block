import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Hero', () => {
    const titleSelector = '.block.inner.title [contenteditable="true"]';

    // Change page title
    cy.get(titleSelector).clear();
    cy.get(titleSelector).type('Hero Block Test');

    cy.get('.documentFirstHeading').contains('Hero Block Test');

    cy.get(titleSelector).type('{enter}');

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'hero',
    );
    cy.get('.button.hero').click({ force: true });

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('Hero Block Test');
    cy.get('.block.hero');
  });
});
