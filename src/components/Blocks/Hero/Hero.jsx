import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';

Hero.propTypes = {
  image: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  alignContent: PropTypes.string,
  justifyContent: PropTypes.string,
  backgroundVariant: PropTypes.string,
  quoted: PropTypes.bool,
  textVariant: PropTypes.string,
};

function Hero({
  image,
  fullWidth = true,
  fullHeight = true,
  children,
  styles,
}) {
  const isExternal = !isInternalURL(image);
  const { alignContent = 'center', backgroundVariant = 'primary' } =
    styles || {};
  return (
    <div
      className={cx('eea hero-block', `color-bg-${backgroundVariant}`, {
        'full-width': fullWidth,
        'full-height': fullHeight,
      })}
    >
      <div
        className="hero-block-image"
        style={
          image
            ? {
                backgroundImage: isExternal
                  ? `url(${image}/@@images/image/huge)`
                  : `url(${image})`,
              }
            : {}
        }
      >
        <div
          className={cx(
            'hero-block-inner-wrapper d-flex ui container',
            `flex-items-${alignContent}`,
          )}
        >
          <div className="hero-block-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

Hero.Text = ({ children, styles }) => {
  const { textVariant = 'white', justifyContent = 'left', quoted } =
    styles || {};
  return (
    <div
      className={cx(
        'hero-block-text',
        `color-fg-${textVariant}`,
        `text-${justifyContent}`,
      )}
    >
      <h2 className={cx({ quoted })}>{children}</h2>
    </div>
  );
};

Hero.Meta = ({ children, styles }) => {
  const { justifyContent = 'left' } = styles || {};
  return (
    <div className={cx('hero-block-meta', `text-${justifyContent}`)}>
      {children}
    </div>
  );
};

export default Hero;
