import { isArray } from 'lodash';
import { serializeNodes } from 'volto-slate/editor/render';

const createEmptyHeader = () => {
  return {
    type: 'h2',
    children: [{ text: '' }],
  };
};

export const createSlateHeader = (text) => {
  return isArray(text) ? text : [createEmptyHeader()];
};

export const serializeText = (text) => {
  return isArray(text) ? serializeNodes(text) : text;
};
