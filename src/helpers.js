import { serializeNodes } from '@plone/volto-slate/editor/render';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

export const getFieldURL = (data) => {
  let url = data;
  const _isObject = data && isObject(data) && !Array.isArray(data);
  if (_isObject && data['@type'] === 'URL') {
    url = data['@id'] ?? data['value'] ?? data['url'] ?? data['href'] ?? data;
  } else if (_isObject) {
    url = data['@id'] ?? data['url'] ?? data['href'] ?? data;
  }
  if (Array.isArray(data) && data.length > 0) {
    url = getFieldURL(data[0]);
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

export const createSlateHeader = (text) => {
  return Array.isArray(text) ? text : [createEmptyHeader()];
};

export const serializeText = (text) => {
  return Array.isArray(text) ? serializeNodes(text) : text;
};

export const isImageGif = (image) => {
  const url = getFieldURL(image);
  return url?.endsWith?.('.gif');
};

export function getImageScaleParams(image, size) {
  if (!image) return null;
  const imageScale = size || 'preview'; // listings use preview scale

  if (Array.isArray(image)) {
    const result = image.map((item) => getImageScaleParams(item, size));
    return result.length > 0 ? result[0] : undefined;
  }

  if (typeof image === 'string')
    return isInternalURL(image)
      ? { download: flattenToAppURL(`${image}/@@images/image/${imageScale}`) }
      : { download: image };

  let url = getFieldURL(image);
  const imageScales = image.image_scales;
  const imageField = image.image_field;
  const imageScalesArray = imageScales?.[imageField];
  const imageScalesObject = imageScalesArray?.[0];
  const imageScalesObjectBasePath = imageScalesObject?.base_path;
  const imageScalesObjectScales = imageScalesObject?.scales;
  url = imageScalesObjectBasePath || url;

  if (url && isInternalURL(url)) {
    if (imageScalesArray) {
      const scale = url?.endsWith?.('.gif')
        ? imageScalesObject
        : imageScalesObjectScales?.[imageScale] || imageScalesObject;

      const download = flattenToAppURL(`${url}/${scale?.download}`);
      const width = scale?.width;
      const height = scale?.height;

      return {
        download,
        width,
        height,
      };
    } else if (image?.image?.scales) {
      const imageImage = image.image;
      const imageImageScales = imageImage.scales;
      const scale = imageImageScales?.[imageScale] || imageImage;
      const download = flattenToAppURL(scale?.download);
      const width = scale?.width;
      const height = scale?.height;

      return {
        download,
        width,
        height,
      };
    } else {
      // fallback if we do not have scales
      return {
        download: flattenToAppURL(
          `${url}/@@images/${imageField || 'image'}/${imageScale}`,
        ),
      };
    }
  } else {
    return { download: url };
  }
}
