import React from 'react';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { Icon } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import {
  BlockDataForm,
  SidebarPortal,
  UniversalLink,
} from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import {
  handleKey,
  handleKeyDetached,
} from '@plone/volto-slate/blocks/Text/keyboard';
import {
  createSlateHeader,
  getFieldURL,
} from '@eeacms/volto-hero-block/helpers';
import { HeroBlockSchema } from './schema';
import Copyright from './Copyright';
import Hero from './Hero';

const Metadata = ({ buttonLabel, inverted, styles, ...props }) => {
  const buttonLink = getFieldURL(props.buttonLink);
  const { buttonVariant } = styles || {};

  return buttonLabel ? (
    <UniversalLink
      className={cx('ui button', buttonVariant, { inverted })}
      href={buttonLink || ''}
    >
      {buttonLabel}
    </UniversalLink>
  ) : (
    ''
  );
};

export default function Edit(props) {
  const { slate } = config.settings;
  const {
    data = {},
    block = null,
    selected = false,
    index,
    properties,
    onChangeBlock,
    onSelectBlock,
  } = props;
  const {
    text,
    copyright,
    copyrightIcon,
    copyrightPosition,
    isMultiline,
  } = data;
  const copyrightPrefix = config.blocks.blocksConfig.hero.copyrightPrefix || '';
  const schema = React.useMemo(() => {
    if (isFunction(HeroBlockSchema)) {
      return HeroBlockSchema(props);
    }
    return HeroBlockSchema;
  }, [props]);

  const withBlockProperties = React.useCallback(
    (editor) => {
      editor.getBlockProps = () => props;
      return editor;
    },
    [props],
  );

  const handleFocus = React.useCallback(() => {
    if (!selected) {
      onSelectBlock(block);
    }
  }, [onSelectBlock, selected, block]);

  const extensions = React.useMemo(() => {
    if (isMultiline) {
      return slate.textblockExtensions.filter(
        (f) => f.name !== 'withSplitBlocksOnBreak',
      );
    } else {
      return slate.textblockExtensions;
    }
  }, [slate.textblockExtensions, isMultiline]);

  const value = createSlateHeader(text);

  return (
    <>
      <BodyClass className="with-hero-block" />
      <Hero {...data}>
        <Hero.Text {...data}>
          <SlateEditor
            key={isMultiline}
            detached={!isMultiline}
            index={index}
            properties={properties}
            extensions={extensions}
            renderExtensions={[withBlockProperties]}
            value={value}
            onChange={(text) => {
              onChangeBlock(block, {
                ...data,
                text,
              });
            }}
            block={block}
            onFocus={handleFocus}
            onKeyDown={isMultiline ? handleKeyDetached : handleKey}
            selected={selected}
            placeholder="Add text..."
            slateSettings={slate}
          />
        </Hero.Text>
        <Hero.Meta {...data}>
          <Metadata {...data} />
        </Hero.Meta>
        {copyright ? (
          <Copyright copyrightPosition={copyrightPosition}>
            <Copyright.Prefix>{copyrightPrefix}</Copyright.Prefix>
            <Copyright.Icon>
              <Icon className={copyrightIcon} />
            </Copyright.Icon>
            <Copyright.Text>{copyright}</Copyright.Text>
          </Copyright>
        ) : (
          ''
        )}
      </Hero>

      <SidebarPortal selected={selected}>
        <BlockDataForm
          block={block}
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
}
