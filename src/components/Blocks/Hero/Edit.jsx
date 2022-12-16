import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import {
  BlockDataForm,
  SidebarPortal,
  UniversalLink,
} from '@plone/volto/components';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import { handleKey } from '@plone/volto-slate/blocks/Text/keyboard';
import {
  uploadContent,
  saveSlateBlockSelection,
} from '@plone/volto-slate/actions';

import { createSlateHeader } from '@eeacms/volto-hero-block/helpers';

import Copyright from './Copyright';
import Hero from './Hero';
import getSchema from './schema';

const Metadata = ({ buttonLabel, buttonLink, inverted, styles }) => {
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

const Edit = (props) => {
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
  const { text, copyright, copyrightIcon, copyrightPosition } = data;
  const schema = React.useMemo(() => getSchema(props), [props]);

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

  return (
    <>
      <Hero {...data}>
        <Hero.Text {...data}>
          <SlateEditor
            index={index}
            properties={properties}
            extensions={slate.textblockExtensions}
            renderExtensions={[withBlockProperties]}
            value={createSlateHeader(text)}
            onChange={(text) => {
              onChangeBlock(block, {
                ...data,
                text,
              });
            }}
            block={block}
            onFocus={handleFocus}
            onKeyDown={handleKey}
            selected={selected}
            placeholder="Add text..."
            slateSettings={slate}
          />
        </Hero.Text>
        <Hero.Meta {...data}>
          <Metadata {...data} />
        </Hero.Meta>
        {copyright && (
          <Copyright copyrightPosition={copyrightPosition}>
            <Copyright.Icon>
              <Icon className={copyrightIcon} />
            </Copyright.Icon>
            <Copyright.Text>{copyright}</Copyright.Text>
          </Copyright>
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
};

export default connect(
  (state, props) => {
    const blockId = props.block;
    return {
      defaultSelection: blockId
        ? state.slate_block_selections?.[blockId]
        : null,
      uploadRequest: state.upload_content?.[props.block]?.upload || {},
      uploadedContent: state.upload_content?.[props.block]?.data || {},
    };
  },
  {
    uploadContent,
    saveSlateBlockSelection, // needed as editor blockProps
  },
)(Edit);
