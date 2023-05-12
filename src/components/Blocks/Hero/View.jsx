import React from 'react';
import cx from 'classnames';
import { Icon } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import Hero from './Hero';
import Copyright from './Copyright';
import { serializeText } from '@eeacms/volto-hero-block/helpers';
import { getFieldURL } from '@eeacms/volto-hero-block/helpers';
import config from '@plone/volto/registry';

const Metadata = ({ buttonLabel, inverted, styles, ...props }) => {
  const buttonLink = getFieldURL(props.buttonLink);
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
  const copyrightPrefix = config.blocks.blocksConfig.hero.copyrightPrefix || '';
  return (
    <React.Fragment>
      <BodyClass className="with-hero-block" />
      <Hero {...data}>
        <Hero.Text {...data}>{serializeText(text)}</Hero.Text>
        <Hero.Meta {...data}>
          <Metadata {...data} />
        </Hero.Meta>
        {copyright ? (
          <Copyright copyrightPosition={copyrightPosition}>
            <Copyright.Prefix>{copyrightPrefix}</Copyright.Prefix>
            <Copyright.Icon>
              <Icon className={copyrightIcon} />
            </Copyright.Icon>
            <Copyright.Text>{copyright}</Copyright.Text>
          </Copyright>
        ) : (
          ''
        )}
      </Hero>
    </React.Fragment>
  );
};

export default View;
