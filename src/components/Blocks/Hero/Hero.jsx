import React, { useMemo, useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { isImageGif, getFieldURL } from '@eeacms/volto-hero-block/helpers';
import { useFirstVisited } from '@eeacms/volto-hero-block/hooks';

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
  overlay = true,
  fullWidth = true,
  fullHeight = true,
  children,
  spaced = false,
  inverted = true,
  styles,
  height,
  ...props
}) {
  const image = useMemo(() => getFieldURL(props.image), [props.image]);
  const isExternal = useMemo(() => !isInternalURL(image), [image]);
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
      onScreen && image
        ? {
            backgroundImage: isExternal
              ? `url(${image})`
              : isImageGif(image)
              ? `url(${image}/@@images/image)`
              : `url(${image}/@@images/image/huge)`,
          }
        : {},
    [isExternal, onScreen, image],
  );

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
        style={containerCssStyles}
      >
        <div
          className={cx('hero-block-image', styles?.bg)}
          ref={bgImgRef}
          style={backgroundImageStyle}
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
