import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import configureStore from 'redux-mock-store';
import Edit from './Edit';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom/extend-expect';

// Mock uuid to avoid node:crypto import issues
jest.mock('uuid', () => ({
  v4: () => 'mock-uuid-' + Math.random().toString(36).substr(2, 9),
}));

const mockStore = configureStore([]);
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
jest.mock('@plone/volto/components', () => {
  return {
    __esModule: true,
    BlocksForm: ({ placeholder, children, onChange, onFocus }) => (
      <div id="test">
        <div>{placeholder}</div>
        {typeof children === 'function'
          ? children({}, <div>Mock Edit Block</div>, {})
          : children}
      </div>
    ),
    SidebarPortal: ({ children }) => <div>{children}</div>,
    BlockDataForm: () => <div></div>,
    UniversalLink: () => <div></div>,
    RenderBlocks: () => <div></div>,
  };
});

jest.mock(
  '@plone/volto/components/manage/Blocks/Block/EditBlockWrapper',
  () => {
    return ({ children }) => (
      <div className="edit-block-wrapper">{children}</div>
    );
  },
);
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/test-jest',
    search: '',
    hash: '',
    state: null,
    key: 'test-jest',
  }),
}));

window.IntersectionObserver = jest.fn(() => ({
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
    const onSelectBlock = jest.fn();
    render(
      <IntlProvider locale="en" messages={{}}>
        <Provider store={store}>
          <Edit onSelectBlock={onSelectBlock} onChangeBlock={() => {}} />
        </Provider>
      </IntlProvider>,
    );
  });
});
