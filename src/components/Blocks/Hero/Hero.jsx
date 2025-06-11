import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'semantic-ui-react';
import Copyright from './Copyright';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { isImageGif, getFieldURL } from '@eeacms/volto-hero-block/helpers';
import { useFirstVisited } from '@eeacms/volto-hero-block/hooks';
Hero.propTypes = {
  image: PropTypes.bool,
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
  const image = getFieldURL(props.image);
  const isExternal = !isInternalURL(image);
  const { alignContent = 'center', backgroundVariant = 'primary' } =
    styles || {};
  const bgImgRef = React.useRef();
  const onScreen = useFirstVisited(bgImgRef);
  const containerCssStyles = React.useMemo(
    () => ({
      ...(height && !fullHeight ? { height } : {}),
    }),
    [height, fullHeight],
  );

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
console.log(backgroundImageStyle)
  return (
    // full width prop
    <div
      className={`${
        fullWidth ? 'eea hero-block full-width' : 'eea hero-block'
      } ${fullHeight ? 'full-height' : ''} color-bg-${backgroundVariant}`}
    >
      <div
        ref={bgImgRef}
        className="hero-block-image"
        style={backgroundImageStyle}
      >
        <div
          className={`hero-block-inner-wrapper d-flex ui container flex-items-${alignContent}`}
        >
          <div className="hero-block-body">
            {children}


          </div>
        </div>
      </div>
    </div>
  );
}

Hero.Text = ({ quoted, textVariant, textAlign, children }) => (
  <div className={`hero-block-text color-fg-${textVariant} text-${textAlign}`}>
    <h2 className={`${quoted ? 'quoted' : ''}`}>{children}</h2>
  </div>
);
Hero.Meta = ({ metaAlign, children }) => (
  <div className={`hero-block-meta text-${metaAlign}`}>{children}</div>
);

export default Hero;
