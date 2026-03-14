import { slateLayoutBeforeEach, slateLayoutAfterEach } from '../support/e2e';

describe('ControlPanel: Dexterity Content-Types Layout', () => {
  beforeEach(slateLayoutBeforeEach);
  afterEach(slateLayoutAfterEach);

  it('Edit Blocks Layout for Book', () => {
    cy.visit('/controlpanel/dexterity-types');

    cy.get('a[href="/controlpanel/dexterity-types/book"]').should(
      'have.text',
      'book',
    );

    cy.visit('/controlpanel/dexterity-types/book/layout');
    cy.get('#page-controlpanel-layout').contains(
      'Can not edit Layout for book',
    );
    cy.get('#page-controlpanel-layout button').click();

    // Wait a bit for editor to load
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]:visible').first().type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'hero',
    );
    cy.get('.button.hero').click({ force: true });

    cy.get('#toolbar-save').click();

    cy.visit('/cypress');

    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');

    // Change book title
    const titleSelector = '.block.inner.title [contenteditable="true"]';
    cy.get(titleSelector).clear();
    cy.get(titleSelector).type('My First Book');
    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('#toolbar-save').click();

    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('.block.hero');
  });
});
