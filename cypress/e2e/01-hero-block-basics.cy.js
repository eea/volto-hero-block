import { slateBeforeEach, slateAfterEach } from '../support/e2e';

describe('Hero Block Tests', () => {
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
    cy.get('.blocks-chooser .button.hero').contains('Hero').click({
      force: true,
    });
    cy.get('.block.hero', { timeout: 10000 })
      .last()
      .scrollIntoView()
      .should('exist')
      .click({ force: true });
    cy.get('#sidebar .formtabs .item').contains('Block').click({ force: true });

    cy.get('textarea#field-buttonLabel:visible')
      .should('be.visible')
      .click()
      .type('Test Button');

    cy.get('.ui.form #blockform-fieldset-styling').click();

    cy.get(
      '.inline.field.align-widget.field-wrapper-textAlign-3-styles .align-buttons button[aria-label="Center"]',
    )
      .eq(0)
      .click();

    cy.get('.hero-block-text div[role="textbox"]')
      .click()
      .type('My Hero Block');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // then the page view should contain our changes
    cy.contains('Hero Block Test');
    cy.get('.eea.hero-block').should('be.visible');
    cy.contains('My Hero Block');
    cy.contains('Test Button');
  });

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
    cy.get('.block.hero', { timeout: 10000 })
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

    // Inner block buttons (add, drag, delete) should be hidden by CSS
    cy.get('.hero-block .block-add-button').should('not.be.visible');
    cy.get('.hero-block .drag.handle.wrapper').should('not.be.visible');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // Verify text persisted after save
    cy.get('.eea.hero-block').should('be.visible');
    cy.contains('Inner text content');
  });

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
    cy.get('.block.hero', { timeout: 10000 })
      .last()
      .scrollIntoView()
      .should('exist')
      .click({ force: true });

    // Add text and button
    cy.get('.hero-block-text div[role="textbox"]')
      .click()
      .type('Persistent hero text');

    cy.get('#sidebar .formtabs .item').contains('Block').click({ force: true });
    cy.get('textarea#field-buttonLabel:visible')
      .should('be.visible')
      .click()
      .type('Click Me');

    // Save
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    // Verify content is visible
    cy.contains('Persistent hero text');
    cy.contains('Click Me');

    // Re-enter edit mode
    cy.navigate('/cypress/my-page/edit');

    // Verify content persists in edit mode
    cy.get('.block.hero', { timeout: 10000 }).should('exist');
    cy.get('.hero-block-text').should('contain', 'Persistent hero text');
  });
});
