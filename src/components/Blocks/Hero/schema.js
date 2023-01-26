import { addStyling } from "@plone/volto/helpers";

export default () => {
  return {
    title: "Hero",
    fieldsets: [
      {
        id: "default",
        title: "Default",
        fields: [
          "fullWidth",
          "fullHeight",
          "quoted",
          "spaced",
          "inverted",
          "buttonLabel",
          "buttonLink",
          "overlay",
          "image",
        ],
      },
      {
        id: "copyright",
        title: "Copyright",
        fields: ["copyright", "copyrightIcon", "copyrightPosition"],
      },
    ],
    properties: {
      fullWidth: {
        title: "Full width",
        type: "boolean",
        defaultValue: true,
      },
      fullHeight: {
        title: "Full height",
        type: "boolean",
        defaultValue: true,
      },
      quoted: {
        title: "Quoted",
        type: "boolean",
        defaultValue: false,
      },
      spaced: {
        title: "Spaced",
        type: "boolean",
        defaultValue: false,
      },
      inverted: {
        title: "Inverted",
        type: "boolean",
        defaultValue: true,
      },
      buttonLabel: {
        title: "Button label",
        widget: "textarea",
      },
      buttonLink: {
        title: "Button link",
        widget: "url",
      },
      overlay: {
        title: "Image darken overlay",
        type: "boolean",
        defaultValue: true,
      },
      image: {
        title: "Image",
        widget: "attachedimage",
      },
      copyright: {
        title: "Text",
      },
      copyrightIcon: {
        title: "Icon",
        default: "ri-copyright-line",
      },
      copyrightPosition: {
        title: "Align",
        widget: "align",
        actions: ["left", "right"],
        defaultValue: "left",
      },
    },
    required: [],
  };
};

export const stylingSchema = (props) => {
  const schema = addStyling(props);
  schema.properties.styles.schema = {
    title: "Hero style",
    block: "hero",
    fieldsets: [
      {
        id: "default",
        title: "Default",
        fields: [
          "backgroundVariant",
          "alignContent",
          "textAlign",
          "textVariant",
          "buttonVariant",
          "buttonAlign",
        ],
      },
    ],
    properties: {
      backgroundVariant: {
        title: "Background theme",
        widget: "theme_picker",
        colors: [
          ...(config.settings && config.settings.themeColors
            ? config.settings.themeColors.map(({ value, title }) => ({
                name: value,
                label: title,
              }))
            : []),
          //and add extra ones here
        ],
      },
      alignContent: {
        title: "Content align",
        choices: [
          ["start", "Top"],
          ["center", "Center"],
          ["end", "Bottom"],
        ],
      },
      textAlign: {
        title: "Text align",
        widget: "align",
        actions: ["left", "center", "right"],
        defaultValue: "left",
      },
      textVariant: {
        title: "Text theme",
        widget: "color_picker",
        colors: [
          { name: "primary", label: "Primary" },
          { name: "secondary", label: "Secondary" },
          { name: "tertiary", label: "Tertiary" },
          { name: "grey", label: "Grey" },
        ],
      },
      buttonVariant: {
        title: "Button theme",
        widget: "color_picker",
        colors: [
          { name: "primary", label: "Primary" },
          { name: "secondary", label: "Secondary" },
          { name: "tertiary", label: "Tertiary" },
          { name: "grey", label: "Grey" },
        ],
      },
      buttonAlign: {
        title: "Button align",
        widget: "align",
        actions: ["left", "center", "right"],
        defaultValue: "left",
      },
    },
    required: [],
  };
  return schema;
};
