import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { isImageGif } from '@eeacms/volto-hero-block/helpers';

Hero.propTypes = {
  image: PropTypes.string,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  alignContent: PropTypes.string,
  textAlign: PropTypes.string,
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
        !image &&
          backgroundVariant &&
          !fullWidth &&
          `color-bg-${backgroundVariant}`,
        {
          spaced,
          inverted,
          'full-height': fullHeight,
        },
      )}
    >
      <div
        className={cx(
          'hero-block-image-wrapper',
          !image &&
            backgroundVariant &&
            fullWidth &&
            `color-bg-${backgroundVariant}`,
          {
            'full-width': fullWidth,
          },
        )}
      >
        <div
          className={cx('hero-block-image')}
          style={
            image
              ? {
                  backgroundImage: isExternal
                    ? `url(${image})`
                    : isImageGif(image)
                    ? `url(${image}/@@images/image)`
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
  const { textVariant = 'white', textAlign = 'left' } = styles || {};
  return (
    <div
      className={cx(
        'hero-block-text',
        `color-fg-${textVariant}`,
        `text-${textAlign}`,
      )}
    >
      <div className={quoted ? 'quoted-wrapper' : ''}>{children}</div>
    </div>
  );
};

Hero.Meta = ({ children, styles }) => {
  const { buttonAlign = 'left' } = styles || {};
  return (
    <div className={cx('hero-block-meta', `text-${buttonAlign}`)}>
      {children}
    </div>
  );
};

export default Hero;
