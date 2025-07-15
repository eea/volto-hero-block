import React from 'react';
import PropTypes from 'prop-types';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { isImageGif, getFieldURL } from '@eeacms/volto-hero-block/helpers';
import { useFirstVisited } from '@eeacms/volto-hero-block/hooks';
import cx from 'classnames';

Hero.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.object,
  ]),
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  alignContent: PropTypes.string,
  textAlign: PropTypes.string,
  metaAlign: PropTypes.string,
  backgroundVariant: PropTypes.string,
  quoted: PropTypes.bool,
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
  const image =
    typeof props.image == 'string'
      ? getFieldURL(props.image)
      : Array.isArray(props.image)
      ? getFieldURL(props.image?.[0])
      : getFieldURL(props.image);
  const isExternal = !isInternalURL(image);
  const { alignContent = 'center', backgroundVariant = 'primary' } =
    styles || {};
  const bgImgRef = React.useRef();
  const onScreen = useFirstVisited(bgImgRef);
  const backgroundImageStyle =
    onScreen && image
      ? {
          backgroundImage: isExternal
            ? `url(${image})`
            : isImageGif(image)
            ? `url(${image}/@@images/image)`
            : `url(${image}/@@images/image/huge)`,
        }
      : {};
  return (
    <div
      className={` eea hero-block ${fullHeight ? 'full-height' : ''}  ${
        spaced ? 'spaced' : ''
      }`}
    >
      <div
        className={`hero-block-image-wrapper ${
          fullWidth ? 'full-width' : ''
        } color-bg-${backgroundVariant}`}
      >
        <div
          ref={bgImgRef}
          className={`hero-block-image ${styles?.bg}`}
          style={backgroundImageStyle}
        >
          {image && overlay && (
            <div className="hero-block-image-overlay dark-overlay-4"></div>
          )}
        </div>
      </div>
      <div
        className={`hero-block-inner-wrapper d-flex ui container flex-items-${alignContent}`}
      >
        <div className="hero-block-body">{children}</div>
      </div>
    </div>
  );
}

Hero.Text = ({ quoted, styles, children, ...props }) => {
  const { textVariant = 'white', textAlign = 'left' } =
    { ...(props || {}), ...(styles || {}) } || {};
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
Hero.Meta = ({ metaAlign, children }) => (
  <div className={`hero-block-meta text-${metaAlign}`}>{children}</div>
);

export default Hero;
