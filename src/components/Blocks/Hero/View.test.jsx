import React from 'react';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import View from './View';

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn((callback) => ({
  observe,
  unobserve,
}));

describe('View Component', () => {
  it('renders view component', () => {
    config.blocks = {
      blocksConfig: {
        hero: {
          copyrightPrefix: 'Copyright: ',
        },
      },
    };
    const data = {
      text: 'Hello, World!',
      copyright: 'Copyright 2023',
      copyrightIcon: 'copyright-icon-class',
      copyrightPosition: 'bottom',
    };
    render(<View data={data} />);
  });
});
