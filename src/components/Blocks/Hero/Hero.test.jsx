import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import '@testing-library/jest-dom/extend-expect';

import Hero from './Hero';

const { settings } = config;

const mockStore = configureStore();

const observe = jest.fn();
const unobserve = jest.fn();
window.IntersectionObserver = jest.fn((callback) => ({
  observe,
  unobserve,
}));

jest.mock('@eeacms/volto-hero-block/hooks', () => ({
  useFirstVisited: jest.fn(() => true),
}));

describe('Hero block', () => {
  it('renders a hero component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
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

    expect(container.querySelector('.eea.hero-block')).toBeInTheDocument();
    expect(container.querySelector('.inverted')).toBeInTheDocument();
    expect(container.querySelector('.full-height')).toBeInTheDocument();
    expect(container.querySelector('.full-width')).toBeInTheDocument();
  });

  it('renders a hero component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Hero
          image=""
          overlay={true}
          fullWidth={false}
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

    expect(container.querySelector('.eea.hero-block')).toBeInTheDocument();
    expect(container.querySelector('.inverted')).toBeInTheDocument();
    expect(container.querySelector('.full-height')).toBeInTheDocument();
    expect(container.querySelector('.full-width')).not.toBeInTheDocument();
  });

  it('renders a hero component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Hero
          image={[{ '@type': 'URL', url: 'url_url', href: 'href_url' }]}
          overlay={true}
          fullWidth={false}
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

    expect(container.querySelector('.hero-block-image')).toHaveStyle({
      backgroundImage: 'url(url_url)',
    });
    expect(container.querySelector('.eea.hero-block')).toBeInTheDocument();
  });

  it('renders a hero component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Hero
          image={`${settings.apiPath}/foo/bar`}
          overlay={true}
          fullWidth={false}
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

    expect(container.querySelector('.hero-block-image')).toHaveStyle({
      backgroundImage: 'url(/foo/bar/@@images/image/huge)',
    });
    expect(container.querySelector('.eea.hero-block')).toBeInTheDocument();
  });

  it('renders a hero component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Hero
          image={`${settings.apiPath}/foo/bar.gif`}
          styles={{ alignContent: undefined, backgroundVariant: undefined }}
        >
          <Hero.Text
            quoted={true}
            styles={{ textVariant: undefined, textAlign: undefined }}
          >
            Text test
          </Hero.Text>
          <Hero.Meta styles={{ buttonAlign: undefined }}>Test meta</Hero.Meta>
        </Hero>
      </Provider>,
    );

    expect(container.querySelector('.quoted-wrapper')).toBeInTheDocument();
  });

  it('renders a hero component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Hero image={`${settings.apiPath}/foo/bar.gif`} styles={undefined}>
          <Hero.Text quoted={true} styles={undefined}>
            Text test
          </Hero.Text>
          <Hero.Meta styles={undefined}>Test meta</Hero.Meta>
        </Hero>
      </Provider>,
    );

    expect(container.querySelector('.quoted-wrapper')).toBeInTheDocument();
  });
});
