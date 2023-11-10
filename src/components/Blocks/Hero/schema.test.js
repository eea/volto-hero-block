import { stylingSchema, HeroBlockSchema } from './schema';
import config from '@plone/volto/registry';

jest.mock('@plone/volto/helpers', () => ({
  addStyling: jest.fn((schema) => schema),
}));

export const EMPTY_STYLES_SCHEMA = {
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],
  properties: {
    styles: {},
  },
  required: [],
};

describe('stylingSchema', () => {
  it('returns the enhanced stylesSchema', () => {
    const schema = EMPTY_STYLES_SCHEMA;
    expect(stylingSchema(schema)).not.toBe({});
  });
  it('checks if the stylesSchema has desired fields', () => {
    const schema = EMPTY_STYLES_SCHEMA;
    const stylesSchema = stylingSchema(schema);
    expect(
      stylesSchema.properties.styles.schema.fieldsets[0].fields,
    ).toHaveLength(7);
  });

  it('checks if the backgroundVariant styles has value', () => {
    config.settings.themeColors = [{ value: 'primary', title: 'Primary' }];
    const schema = EMPTY_STYLES_SCHEMA;
    const stylesSchema = stylingSchema(schema);
    expect(
      stylesSchema.properties.styles.schema.properties.backgroundVariant.colors,
    ).toHaveLength(1);
  });
  it('checks if the Text styles has value', () => {
    config.settings.themeColors = [{ value: 'primary', title: 'Primary' }];
    const schema = EMPTY_STYLES_SCHEMA;
    const stylesSchema = stylingSchema(schema);
    expect(
      stylesSchema.properties.styles.schema.properties.textVariant.colors,
    ).toHaveLength(1);
  });
  it('checks if the button styles has value', () => {
    config.settings.themeColors = [{ value: 'primary', title: 'Primary' }];
    const schema = EMPTY_STYLES_SCHEMA;
    const stylesSchema = stylingSchema(schema);
    expect(
      stylesSchema.properties.styles.schema.properties.buttonVariant.colors,
    ).toHaveLength(1);
  });
});

describe('HeroBlockSchema', () => {
  it('checks if the hero block schema is valid', () => {
    const schema = HeroBlockSchema();
    expect(schema.fieldsets).toHaveLength(2);
  });
});
