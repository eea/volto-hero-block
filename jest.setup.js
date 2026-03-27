import { jest } from '@jest/globals';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

var mockSemanticComponents = jest.requireActual('semantic-ui-react');
var config = {
  blocks: {
    blocksConfig: {},
  },
  settings: {
    apiPath: 'http://localhost:3000',
    slate: {
      textblockExtensions: [],
    },
  },
};

jest.doMock('semantic-ui-react', () => ({
  __esModule: true,
  ...mockSemanticComponents,
  Popup: ({ content, trigger }) => {
    return (
      <div className="popup">
        <div className="trigger">{trigger}</div>
        <div className="content">{content}</div>
      </div>
    );
  },
}));

jest.doMock('@plone/volto/components', () => {
  return {
    __esModule: true,
    SidebarPortal: ({ children }) => <div id="sidebar">{children}</div>,
    UniversalLink: ({ children, href = '', ...props }) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
    RenderBlocks: () => <div />,
    BlocksForm: ({ children }) =>
      typeof children === 'function' ? children({}, <div />, {}) : children,
    BlockDataForm: () => <div />,
  };
});

jest.doMock('@plone/volto/registry', () => ({
  __esModule: true,
  default: config,
}));

const mockStore = configureStore([thunk]);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

global.store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
    formatMessage: jest.fn(),
  },
  content: {
    create: {},
    subrequests: [],
  },
  connected_data_parameters: {},
  screen: {
    page: {
      width: 768,
    },
  },
});
