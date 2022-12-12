import { isArray } from 'lodash';
import { serializeNodes } from '@plone/volto-slate/editor/render';

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

export const isImageGif = (image) => {
  return image.substr(image.length - 4) === '.gif';
};
