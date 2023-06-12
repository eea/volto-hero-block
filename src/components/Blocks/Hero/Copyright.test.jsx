import React from 'react';
import renderer from 'react-test-renderer';
import Copyright from './Copyright';
import { Icon } from 'semantic-ui-react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';

const mockStore = configureStore();

test('renders copyright', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const copyrightPrefix =
    config.blocks.blocksConfig.hero?.copyrightPrefix || '';

  const component = renderer.create(
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

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
