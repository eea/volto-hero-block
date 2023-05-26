import installHeroBlock from '@eeacms/volto-hero-block/components/Blocks/Hero';
// import { getFieldURL } from '@eeacms/volto-hero-block/helpers';

const applyConfig = (config) => {
  // Passing a string url expect a relative string path
  // console.log('HERE', getFieldURL('/path/to/image'));
  // Passing a string url with absolute path expect a relativ string path
  // console.log('HERE', getFieldURL('/path/to/image'));
  return [installHeroBlock].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
