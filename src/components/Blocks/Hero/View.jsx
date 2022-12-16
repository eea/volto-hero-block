import React from 'react';
import cx from 'classnames';
import { Icon } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import Hero from './Hero';
import Copyright from './Copyright';
import { serializeText } from '@eeacms/volto-hero-block/helpers';

const Metadata = ({ buttonLabel, buttonLink, inverted, styles }) => {
  const { buttonVariant = 'white' } = styles || {};

  return buttonLabel ? (
    <UniversalLink
      className={cx('ui button', buttonVariant, { inverted })}
      href={buttonLink || ''}
    >
      {buttonLabel}
    </UniversalLink>
  ) : (
    ''
  );
};

const View = (props) => {
  const { data = {} } = props;
  const { text, copyright, copyrightIcon, copyrightPosition } = data;
  return (
    <Hero {...data}>
      <Hero.Text {...data}>{serializeText(text)}</Hero.Text>
      <Hero.Meta {...data}>
        <Metadata {...data} />
      </Hero.Meta>
      {copyright ? (
        <Copyright copyrightPosition={copyrightPosition}>
          <Copyright.Icon>
            <Icon className={copyrightIcon} />
          </Copyright.Icon>
          <Copyright.Text>{copyright}</Copyright.Text>
        </Copyright>
      ) : (
        ''
      )}
    </Hero>
  );
};

export default View;
