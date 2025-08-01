import React, { useMemo, useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { getImageScaleParams } from '@eeacms/volto-object-widget/helpers';
import { useFirstVisited } from '@eeacms/volto-hero-block/hooks';

Hero.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
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

function Hero(props) {
  const {
    image,
    fullWidth = false,
    fullHeight = false,
    height,
    styles,
    overlay = true,
    children,
    spaced = false,
    inverted = false,
  } = props;

  const scaledImage = useMemo(
    () => (image ? getImageScaleParams(image, 'huge') : null),
    [image],
  );
  const { alignContent = 'center', backgroundVariant = 'primary' } =
    styles || {};
  const bgImgRef = useRef();
  const onScreen = useFirstVisited(bgImgRef);
  const containerCssStyles = useMemo(
    () => ({
      ...(height && !fullHeight ? { height } : {}),
    }),
    [height, fullHeight],
  );
  const backgroundImageStyle = useMemo(
    () =>
      onScreen && scaledImage
        ? {
            backgroundImage: `url(${scaledImage.download})`,
          }
        : {},
    [onScreen, scaledImage],
  );

  return (
    <div
      className={cx(
        'eea hero-block',
        !scaledImage &&
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
          !scaledImage &&
            backgroundVariant &&
            fullWidth &&
            `color-bg-${backgroundVariant}`,
          {
            'full-width': fullWidth,
          },
        )}
        style={containerCssStyles}
      >
        <div
          className={cx('hero-block-image', styles?.bg)}
          ref={bgImgRef}
          style={backgroundImageStyle}
        />
        {scaledImage && overlay && (
          <div className="hero-block-image-overlay dark-overlay-4"></div>
        )}
      </div>
      <div
        className={cx(
          'hero-block-inner-wrapper d-flex',
          `flex-items-${alignContent}`,
        )}
        style={containerCssStyles}
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
        quoted ? 'quoted-wrapper' : '',
      )}
    >
      {children}
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
