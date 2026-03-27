import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Hero Block: Inner text editing', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Hero block inner text editing works without EditBlockWrapper', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Hero Inner Text Test');

    cy.getSlate().click();

    // Add hero block
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'hero',
    );
    cy.get('.blocks-chooser .button.hero').contains('Hero').click({
      force: true,
    });
    cy.get('.block.hero')
      .last()
      .scrollIntoView()
      .should('exist')
      .click({ force: true });

    // Click into the inner text area and type
    cy.get('.hero-block-text div[role="textbox"]')
      .click()
      .type('Inner text content');

    // Verify the text appears in the hero block text area
    cy.get('.hero-block-text').should('contain', 'Inner text content');

    // Inner block buttons (add, drag, delete) should not be visible
    cy.get('.hero-block .block-add-button').should('not.exist');
    cy.get('.hero-block .drag.handle.wrapper').should('not.be.visible');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // Verify text persisted after save
    cy.get('.eea.hero-block').should('be.visible');
    cy.contains('Inner text content');
  });
});
