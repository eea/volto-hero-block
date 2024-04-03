import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from 'semantic-ui-react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom/extend-expect';

import Copyright from './Copyright';

const mockStore = configureStore();

describe('Copyright', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  it('renders copyright with left position', () => {
    const copyrightPrefix =
      config.blocks.blocksConfig.hero?.copyrightPrefix || '';

    const { container } = render(
      <Provider store={store}>
        <Copyright copyrightPosition={'left'}>
          <Copyright.Prefix>{copyrightPrefix}</Copyright.Prefix>
          <Copyright.Icon>
            <Icon className={'copyright outline'} />
          </Copyright.Icon>
          <Copyright.Text>Copyright Text Test</Copyright.Text>
        </Copyright>
      </Provider>,
    );

    expect(screen.getByText('Copyright Text Test')).toBeInTheDocument();
    expect(container.querySelector('i.copyright.outline')).toBeInTheDocument();
    expect(
      container.querySelector('div.eea.copyright.left'),
    ).toBeInTheDocument();
  });

  it('renders copyright without prefix', () => {
    const { container } = render(
      <Provider store={store}>
        <Copyright copyrightPosition={'right'}>
          <Copyright.Icon>
            <Icon className={'copyright outline'} />
          </Copyright.Icon>
          <Copyright.Text>Copyright Text Test</Copyright.Text>
        </Copyright>
      </Provider>,
    );

    expect(screen.queryByText('Prefix')).not.toBeInTheDocument();
    expect(screen.getByText('Copyright Text Test')).toBeInTheDocument();
    expect(container.querySelector('i.copyright.outline')).toBeInTheDocument();
    expect(
      container.querySelector('div.eea.copyright.right'),
    ).toBeInTheDocument();
  });
});
