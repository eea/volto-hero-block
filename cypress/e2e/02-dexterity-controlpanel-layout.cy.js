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

    cy.get('#sidebar .formtabs .item')
      .contains('Settings')
      .click({ force: true });

    // Wait a bit for editor to load
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();
    cy.get('input[id="field-placeholder"]').click().type('About this book');
    cy.get('label[for="field-fixed"]').click();
    cy.getSlateEditorAndType('{enter}');

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get(".blocks-chooser .ui.form .field.searchbox input[type='text']").type(
      'hero',
    );
    cy.get('.blocks-chooser .button.hero').contains('Hero').click({
      force: true,
    });

    // Add text and button
    cy.get('.block.hero', { timeout: 10000 })
      .last()
      .scrollIntoView()
      .should('exist')
      .click({ force: true });
    cy.get('#sidebar .formtabs .item')
      .contains('Settings')
      .click({ force: true });
    cy.get('input[id="field-placeholder"]')
      .clear()
      .type('Hero helper text');
    cy.get('label[for="field-required"]').click();

    cy.get('#toolbar-save').click();

    cy.visit('/cypress');

    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');

    cy.get('.block.hero', { timeout: 10000 })
      .last()
      .scrollIntoView()
      .should('exist')
      .click({ force: true });
    cy.get('#sidebar .formtabs .item').contains('Block').click({ force: true });
    cy.get('#field-buttonLabel:visible')
      .should('be.visible')
      .click()
      .type('my button');
    cy.get('.inline.field.field-attached-image .ui.input:visible')
      .click()
      .type('https://eea.github.io/volto-eea-design-system/img/eea_icon.png');
    cy.get(
      '.inline.field.field-attached-image .ui.buttons .primary.button',
    ).click({ force: true });
    cy.get('.hero-block-text div[role="textbox"]').click().type('My hero block');

    // Change book title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My First Book');
    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('#toolbar-save').click();

    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('.eea.hero-block').should('be.visible');
    cy.get('.hero-block-meta .button').contains('my button');
    cy.get('.hero-block-image-wrapper').should('exist');
    cy.get('.hero-block-meta.text-left .button').contains('my button');
  });
});
