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
          'quoted',
          'spaced',
          'inverted',
          'buttonLabel',
          'buttonLink',
          'overlay',
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
      quoted: {
        title: 'Quoted',
        type: 'boolean',
        defaultValue: false,
      },
      spaced: {
        title: 'Spaced',
        type: 'boolean',
        defaultValue: false,
      },
      inverted: {
        title: 'Inverted',
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
      overlay: {
        title: 'Image darken overlay',
        type: 'boolean',
        defaultValue: true,
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
        'backgroundVariant',
        'alignContent',
        'textAlign',
        'textVariant',
        'buttonVariant',
        'buttonAlign',
      ],
    },
  ],
  properties: {
    backgroundVariant: {
      title: 'Background theme',
      choices: [
        ['primary', 'Primary'],
        ['secondary', 'Secondary'],
        ['tertiary', 'Tertiary'],
        ['grey', 'Grey'],
      ],
    },
    alignContent: {
      title: 'Content align',
      choices: [
        ['start', 'Top'],
        ['center', 'Center'],
        ['end', 'Bottom'],
      ],
    },
    textAlign: {
      title: 'Text align',
      widget: 'align',
      actions: ['left', 'center', 'right'],
      defaultValue: 'left',
    },
    textVariant: {
      title: 'Text theme',
      choices: [
        ['primary', 'Primary'],
        ['secondary', 'Secondary'],
        ['tertiary', 'Tertiary'],
      ],
    },
    buttonVariant: {
      title: 'Button theme',
      choices: [
        ['primary', 'Primary'],
        ['secondary', 'Secondary'],
        ['tertiary', 'Tertiary'],
      ],
    },
    buttonAlign: {
      title: 'Button align',
      widget: 'align',
      actions: ['left', 'center', 'right'],
      defaultValue: 'left',
    },
  },
  required: [],
});
