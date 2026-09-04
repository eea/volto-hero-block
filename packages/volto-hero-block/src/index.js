import installHeroBlock from '@eeacms/volto-hero-block/components/Blocks/Hero';

const applyConfig = (config) => {
  return [installHeroBlock].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
