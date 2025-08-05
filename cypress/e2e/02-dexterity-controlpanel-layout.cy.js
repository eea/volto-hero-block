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

    // Wait a bit for draftjs to load, without this the title block
    // custom placeholder is missing and cypress gives a timeout error
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.content.active.common .button.hero')
      .contains('Hero')

      .click({ force: true });

    cy.get('#toolbar-save').click();

    cy.visit('/cypress');
    // cy.waitForResourceToLoad('@navigation');
    // cy.waitForResourceToLoad('@breadcrumbs');
    // cy.waitForResourceToLoad('@actions');
    // cy.waitForResourceToLoad('@types');

    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');

    // Add text and button
    cy.get('.block.hero div[role="presentation"]').first().click();
    cy.get('.formtabs.menu').children().first().next().click();

    cy.get('label[for="field-quoted"]').click();
    cy.get('label[for="field-spaced"]').click();
    cy.get('.field-wrapper-buttonLabel #field-buttonLabel')
      .click()
      .type('Label');
    cy.get('#field-buttonLabel').click().type('my button');
    cy.get('.inline.field.field-attached-image .ui.input')
      .click()
      .type('https://eea.github.io/volto-eea-design-system/img/eea_icon.png');
    cy.get(
      '.inline.field.field-attached-image .ui.buttons .primary.button',
    ).click();

    cy.get('.hero-block-text div[role="textbox"]')
      .click()
      .type('My hero block');
    cy.get('#field-buttonLabel').type('my button');
    cy.get('#field-fullHeight + label').click();
    cy.get('#field-spaced + label').click();

    // Change book title
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My First Book');
    cy.get('.documentFirstHeading').contains('My First Book');
    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.get('.documentFirstHeading').contains('My First Book');
    // Check if the button exist
    cy.get('.hero-block-meta .button').contains('my button');
    cy.get('.hero-block-image-wrapper');
    // cy.get('.eea.hero-block.spaced.full-height');
    cy.get('.hero-block-meta.text-left .button').contains('my button');
  });
});
