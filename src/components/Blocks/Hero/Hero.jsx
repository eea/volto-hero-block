import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

Hero.propTypes = {
  image: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  contentAlign: PropTypes.string,
  textAlign: PropTypes.string,
  metaAlign: PropTypes.string,
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
  const { contentAlign = 'center', backgroundVariant = 'default' } =
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
            ? { backgroundImage: `url(${image}/@@images/image/preview)` }
            : {}
        }
      >
        <div
          className={cx(
            'hero-block-inner-wrapper d-flex ui container',
            `flex-items-${contentAlign}`,
          )}
        >
          <div className="hero-block-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

Hero.Text = ({ children, styles }) => {
  const { textVariant = 'primary', textAlign = 'left', quoted } = styles || {};
  return (
    <div
      className={cx(
        'hero-block-text',
        `color-fg-${textVariant}`,
        `text-${textAlign}`,
      )}
    >
      <h2 className={cx({ quoted })}>{children}</h2>
    </div>
  );
};

Hero.Meta = ({ children, styles }) => {
  const { metaAlign = 'left' } = styles || {};
  return (
    <div className={cx('hero-block-meta', `text-${metaAlign}`)}>{children}</div>
  );
};

export default Hero;
