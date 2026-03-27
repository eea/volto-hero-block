import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Hero Block: Content persistence', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Hero block re-edit preserves content', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('Hero Re-edit Test');

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

    // Add text
    cy.get('.hero-block-text div[role="textbox"]')
      .click()
      .type('Persistent hero text');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // Verify content is visible in view mode
    cy.get('.eea.hero-block').should('be.visible');
    cy.contains('Persistent hero text');

    // Re-enter edit mode
    cy.navigate('/cypress/my-page/edit');

    // Verify content persists in edit mode
    cy.get('.block.hero')
      .first()
      .should('exist')
      .click({ force: true });
    cy.get('.hero-block-text').should('contain', 'Persistent hero text');
  });
});
