import { serializeNodes } from '@plone/volto-slate/editor/render';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { v4 as uuid } from 'uuid';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

export const getFieldURL = (data) => {
  let url = data;
  const _isObject = data && isObject(data) && !isArray(data);
  if (_isObject && data['@type'] === 'URL') {
    url = data['value'] ?? data['url'] ?? data['href'] ?? data;
  } else if (_isObject) {
    url = data['@id'] ?? data['url'] ?? data['href'] ?? data;
  }
  if (isArray(data)) {
    url = data.map((item) => getFieldURL(item));
  }
  if (isString(url) && isInternalURL(url)) return flattenToAppURL(url);
  return url;
};

const createEmptyHeader = () => {
  return {
    type: 'h2',
    children: [{ text: '' }],
  };
};

export const addEmptyHeaderSlateBlockToData = (
  data,
  index,
  setSelectedBlock,
) => {
  console.log(index);
  const id = uuid();
  setSelectedBlock(id);
  return {
    ...data,
    blocks: {
      ...data.blocks,
      [id]: {
        '@type': 'slate',
        value: [{ type: 'h2', children: [{ text: '' }] }],
        plaintext: '',
      },
    },
    blocks_layout: {
      ...data.blocks_layout,
      items: [
        ...data.blocks_layout.items.slice(0, index),
        id,
        ...data.blocks_layout.items.slice(
          index,
          data.blocks_layout.items.length,
        ),
      ],
    },
  };
};

export const createSlateHeader = (text) => {
  return isArray(text) ? text : [createEmptyHeader()];
};

export const serializeText = (text) => {
  return isArray(text) ? serializeNodes(text) : text;
};

export const isImageGif = (image) => {
  return image?.endsWith?.('.gif');
};
