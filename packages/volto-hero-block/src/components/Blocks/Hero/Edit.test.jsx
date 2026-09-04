import { vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import Edit from './Edit';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom';

// Mock uuid to avoid node:crypto import issues
vi.mock('uuid', () => ({
  v4: () => 'mock-uuid-' + Math.random().toString(36).substr(2, 9),
}));

const mockStore = configureStore([]);
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();
vi.mock('@plone/volto/components/manage/Blocks/Block/BlocksForm', () => {
  return {
    default: ({ placeholder }) => (
      <div id="test">
        <div>{placeholder}</div>
      </div>
    ),
  };
});

vi.mock('@plone/volto/components/manage/Form/BlockDataForm', () => {
  return { default: () => <div></div> };
});
vi.mock('@plone/volto/components/manage/Sidebar/SidebarPortal', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>,
}));
vi.mock('@plone/volto/components/manage/UniversalLink/UniversalLink', () => ({
  __esModule: true,
  default: () => <div></div>,
}));
vi.mock('react-router-dom', () => ({
  useLocation: vi.fn().mockReturnValue({
    pathname: '/test-jest',
    search: '',
    hash: '',
    state: null,
    key: 'test-jest',
  }),
}));

window.IntersectionObserver = vi.fn(() => ({
  observe,
  unobserve,
  disconnect,
}));

config.blocks = {
  blocksConfig: {
    hero: {
      copyrightPrefix: 'Test Prefix',
      schema: {
        title: 'Hero',
        required: [],
      },
    },
  },
};
config.settings = {
  slate: {
    textblockExtensions: [],
  },
  themeColors: [],
};

describe('Edit component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      slate_block_selections: {},
      upload_content: {},
    });
  });

  it('renders without crashing', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={{}}>
        <Provider store={store}>
          <Edit onChangeBlock={() => {}} onSelectBlock={() => {}} />
        </Provider>
      </IntlProvider>,
    );
    expect(container).toBeTruthy();
  });

  it('renders hero text', () => {
    const data = {
      text: [
        {
          type: 'paragraph',
          children: [{ text: 'Sample text' }],
        },
      ],
      copyright: 'true',
      copyrightIcon: 'test',
      copyrightPosition: 'right',
      buttonLabel: 'Test',
    };

    const { container } = render(
      <IntlProvider locale="en" messages={{}}>
        <Provider store={store}>
          <Edit data={data} onChangeBlock={() => {}} />
        </Provider>
      </IntlProvider>,
    );

    expect(container.querySelector('#test')).toBeInTheDocument();
  });

  it('renders without copyrightPrefix', () => {
    config.blocks = {
      blocksConfig: {
        hero: {
          schema: () => ({
            title: 'Hero',
            required: [],
          }),
        },
      },
    };
    const onSelectBlock = vi.fn();
    render(
      <IntlProvider locale="en" messages={{}}>
        <Provider store={store}>
          <Edit onSelectBlock={onSelectBlock} onChangeBlock={() => {}} />
        </Provider>
      </IntlProvider>,
    );
  });
});
