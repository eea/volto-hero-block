import codeSVG from '@plone/volto/icons/code.svg';
import HeroEdit from './Edit';
import HeroView from './View';
import { stylingSchema } from './schema';
import LayoutSchema from './LayoutSchema';
import { defineMessages, createIntlCache, createIntl } from 'react-intl';

const messages = defineMessages({
  heroTitle: {
    id: 'Hero',
    defaultMessage: 'Hero',
  },
});

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: 'en',
    messages: messages,
  },
  cache,
);

const applyConfig = (config) => {
  config.blocks.blocksConfig.hero = {
    id: 'hero',
    title: 'Hero',
    icon: codeSVG,
    group: 'common',
    edit: HeroEdit,
    view: HeroView,
    blockHasOwnFocusManagement: true,
    schemaEnhancer: stylingSchema,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    copyrightPrefix: '',
    security: {
      addPermission: [],
      view: [],
    },
    schema: LayoutSchema(intl),
  };

  config.settings.blocksWithFootnotesSupport = {
    ...(config.settings.blocksWithFootnotesSupport || {}),
    hero: ['text'],
  };

  return config;
};

export default applyConfig;
