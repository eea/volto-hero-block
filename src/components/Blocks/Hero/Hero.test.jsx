import React from 'react';
import renderer from 'react-test-renderer';
import Hero from './Hero';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

test('renders a hero component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Hero
        image=""
        overlay={true}
        fullWidth={true}
        fullHeight={true}
        spaced={false}
        inverted={true}
        styles={{ alignContent: 'center', backgroundVariant: 'primary' }}
      >
        <Hero.Text
          quoted={false}
          styles={{ textVariant: 'white', textAlign: 'left' }}
        >
          Text test
        </Hero.Text>
        <Hero.Meta styles={{ buttonAlign: 'left' }}>Test meta</Hero.Meta>
      </Hero>
    </Provider>,
  );

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
