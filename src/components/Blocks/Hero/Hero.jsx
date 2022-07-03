import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';

Hero.propTypes = {
  image: PropTypes.string,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  alignContent: PropTypes.string,
  justifyContent: PropTypes.string,
  backgroundVariant: PropTypes.string,
  quoted: PropTypes.bool,
  spaced: PropTypes.bool,
  inverted: PropTypes.bool,
  textVariant: PropTypes.string,
};

function Hero({
  image,
  overlay = true,
  fullWidth = true,
  fullHeight = true,
  children,
  spaced = false,
  inverted = true,
  styles,
}) {
  const isExternal = !isInternalURL(image);
  const { alignContent = 'center', backgroundVariant = 'primary' } =
    styles || {};
  return (
    <div
      className={cx(
        'eea hero-block',
        { spaced },
        { inverted },
        !image && backgroundVariant && `color-bg-${backgroundVariant}`,
        {
          'full-height': fullHeight,
        },
      )}
    >
      <div
        className={cx('hero-block-image-wrapper', {
          'full-width': fullWidth,
        })}
      >
        <div
          className={cx('hero-block-image')}
          style={
            image
              ? {
                  backgroundImage: isExternal
                    ? `url(${image})`
                    : `url(${image}/@@images/image/huge)`,
                }
              : {}
          }
        />
        {image && overlay && (
          <div className="hero-block-image-overlay dark-overlay-4"></div>
        )}
      </div>
      <div
        className={cx(
          'hero-block-inner-wrapper d-flex',
          `flex-items-${alignContent}`,
        )}
      >
        <div className="hero-block-body">{children}</div>
      </div>
    </div>
  );
}

Hero.Text = ({ children, quoted, styles }) => {
  const { textVariant = 'white', justifyContent = 'left' } = styles || {};
  return (
    <div
      className={cx(
        'hero-block-text',
        `color-fg-${textVariant}`,
        `text-${justifyContent}`,
      )}
    >
      <div className={quoted ? 'quoted-wrapper' : ''}>{children}</div>
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
