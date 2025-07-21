import { serializeNodes } from '@plone/volto-slate/editor/render';

const createEmptyHeader = () => {
  return {
    type: 'h2',
    children: [{ text: '' }],
  };
};

export const createSlateHeader = (text) => {
  return Array.isArray(text) ? text : [createEmptyHeader()];
};

export const serializeText = (text) => {
  return Array.isArray(text) ? serializeNodes(text) : text;
};
