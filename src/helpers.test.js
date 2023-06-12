import { createSlateHeader, serializeText, isImageGif } from './helpers';
import { isArray } from 'lodash';
import { serializeNodes } from '@plone/volto-slate/editor/render';

jest.mock('@plone/volto-slate/editor/render', () => ({
  serializeNodes: jest.fn(),
}));

describe('createSlateHeader', () => {
  it('should return the text if it is an array', () => {
    const text = ['some', 'text'];
    expect(createSlateHeader(text)).toEqual(text);
  });

  it('should return an array with an empty header if the text is not an array', () => {
    const text = 'some text';
    expect(createSlateHeader(text)).toEqual([
      {
        type: 'h2',
        children: [{ text: '' }],
      },
    ]);
  });
});

describe('serializeText', () => {
  it('should return the text when it is not an array', () => {
    const text = 'Hello, World!';

    expect(serializeText(text)).toEqual(text);
    expect(isArray(text)).toBe(false);
    expect(serializeNodes).not.toHaveBeenCalled();
  });

  it('should call serializeNodes when text is an array', () => {
    const text = ['Hello', 'World!'];

    serializeText(text);
    expect(isArray(text)).toBe(true);
    expect(serializeNodes).toHaveBeenCalledWith(text);
  });
});

describe('isImageGif', () => {
  it('should return true when input is a gif image', () => {
    const input = 'image.gif';
    const result = isImageGif(input);
    expect(result).toBeTruthy();
  });

  it('should return false when input is not a gif image', () => {
    const input = 'image.jpg';
    const result = isImageGif(input);
    expect(result).toBeFalsy();
  });

  it('should return false when input is null or undefined', () => {
    let input;
    let result = isImageGif(input);
    expect(result).toBeFalsy();

    input = null;
    result = isImageGif(input);
    expect(result).toBeFalsy();
  });
});
