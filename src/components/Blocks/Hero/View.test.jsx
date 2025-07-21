import React from 'react';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import View from './View';

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
}));
jest.mock('@plone/volto/components', () => {
  return {
    __esModule: true,
    BlocksForm: ({ placeholder, children, onChange, onFocus }) => (
      <div id="test">
        <div>{placeholder}</div>
        {children}
      </div>
    ),
    SidebarPortal: ({ children }) => <div>{children}</div>,
    BlockDataForm: () => <div></div>,
    UniversalLink: () => <div></div>,
    RenderBlocks: () => <div></div>,
  };
});
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/test-jest',
    search: '',
    hash: '',
    state: null,
    key: 'test-jest',
  }),
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
      copyrightPosition: 'left',
    };
    render(<View data={data} />);
  });
});
