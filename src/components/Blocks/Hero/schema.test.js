import { stylingSchema, HeroBlockSchema } from './schema';

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
});

describe('HeroBlockSchema', () => {
  it('checks if the hero block schema is valid', () => {
    const schema = HeroBlockSchema();
    expect(schema.fieldsets).toHaveLength(2);
  });
});
