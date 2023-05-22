import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Blocks Tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Add Block: Hero', () => {
    // Change page title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Hero Block Test');

    cy.get('.documentFirstHeading').contains('Hero Block Test');

    cy.getSlate().click();

    // Add block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'hero',
    );
    cy.get('.button.hero').click({ force: true });
    cy.get('.hero-block-text div[role="textbox"]')
      .click()
      .type('My Hero Block');

    cy.get(
      '.inline.field.textarea.field-wrapper-buttonLabel textarea#field-buttonLabel',
    )
      .click()
      .type('Test Button');

    cy.get('.ui.form #blockform-fieldset-styling').click();
    cy.get('.color-picker-widget .buttons button[aria-label="Primary"]')
      .eq(2)
      .click();

    cy.get(
      '.inline.field.align-widget.field-wrapper-textAlign-3-styles .align-buttons button[aria-label="Center"]',
    )
      .eq(0)
      .click();

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('Hero Block Test');
    cy.contains('My Hero Block');
    cy.contains('Test Button');
  });
});
