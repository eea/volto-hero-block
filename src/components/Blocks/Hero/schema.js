export default ({ data }) => {
  return {
    title: 'Hero',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'fullWidth',
          'fullHeight',
          'buttonLabel',
          'buttonLink',
          'image',
        ],
      },
    ],
    properties: {
      fullWidth: {
        title: 'Full width',
        type: 'boolean',
        defaultValue: true,
      },
      fullHeight: {
        title: 'Full height',
        type: 'boolean',
        defaultValue: true,
      },
      buttonLabel: {
        title: 'Button label',
        widget: 'textarea',
      },
      buttonLink: {
        title: 'Button link',
        widget: 'url',
      },
      image: {
        title: 'Image',
        widget: 'attachedimage',
      },
    },
    required: [],
  };
};

export const stylingSchema = ({ intl }) => ({
  title: 'Hero style',
  block: 'hero',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'quoted',
        'inverted',
        'alignContent',
        'justifyContent',
        'backgroundVariant',
        'textVariant',
        'buttonVariant',
      ],
    },
  ],
  properties: {
    quoted: {
      title: 'Quoted',
      type: 'boolean',
    },
    inverted: {
      title: 'Inverted',
      type: 'boolean',
    },
    alignContent: {
      title: 'Align content',
      choices: [
        ['start', 'Top'],
        ['center', 'Center'],
        ['end', 'Bottom'],
      ],
    },
    justifyContent: {
      title: 'Align Text',
      widget: 'align',
    },
    backgroundVariant: {
      title: 'Background theme',
      choices: [
        ['primary', 'Primary'],
        ['secondary', 'Secondary'],
        ['tertiary', 'Tertiary'],
        ['grey', 'Grey'],
      ],
    },
    textVariant: {
      title: 'Text theme',
      choices: [
        ['primary', 'Primary'],
        ['secondary', 'Secondary'],
        ['tertiary', 'Tertiary'],
        ['white', 'White'],
      ],
    },
    buttonVariant: {
      title: 'Button theme',
      choices: [
        ['default', 'Default'],
        ['primary', 'Primary'],
        ['secondary', 'Secondary'],
      ],
    },
  },
  required: [],
});
