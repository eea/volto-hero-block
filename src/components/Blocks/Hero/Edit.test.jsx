import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Edit from './Edit';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

jest.mock('@plone/volto-slate/editor/SlateEditor', () => {
  return {
    __esModule: true,
    default: ({ placeholder, children, onChange, onFocus }) => (
      <div
        onChange={(target) => onChange(target)}
        onFocus={() => onFocus()}
        id="test"
      >
        <div>{placeholder}</div>
        {children}
      </div>
    ),
  };
});

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn((callback) => ({
  observe,
  unobserve,
}));

config.blocks = {
  blocksConfig: {
    hero: {
      copyrightPrefix: 'Test Prefix',
      schema: {
        title: 'Hero',
      },
    },
  },
};
config.settings = {
  slate: {
    textblockExtensions: [],
  },
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
      <Provider store={store}>
        <Edit />
      </Provider>,
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
      <Provider store={store}>
        <Edit data={data} />
      </Provider>,
    );

    expect(container.querySelector('#test')).toBeInTheDocument();
  });

  it('calls onFocus when SlateEditor is focused', () => {
    config.blocks = {
      blocksConfig: {
        hero: {
          copyrightPrefix: 'Test Prefix',
          schema: () => ({
            title: 'Hero',
          }),
        },
      },
    };
    const onSelectBlock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Edit onSelectBlock={onSelectBlock} />
      </Provider>,
    );

    fireEvent.focus(getByText('Add text...'));
    expect(onSelectBlock).toHaveBeenCalled();
  });

  it('renders without copyrightPrefix', () => {
    config.blocks = {
      blocksConfig: {
        hero: {
          schema: () => ({
            title: 'Hero',
          }),
        },
      },
    };
    const onSelectBlock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <Edit onSelectBlock={onSelectBlock} />
      </Provider>,
    );
  });
});
