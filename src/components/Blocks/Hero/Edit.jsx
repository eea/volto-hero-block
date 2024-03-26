import React, { useState } from 'react';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { Icon } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { BlocksForm } from '@plone/volto/components';
import EditBlockWrapper from './EditBlockWrapper';
import { v4 as uuid } from 'uuid';

import {
  emptyBlocksForm,
  withBlockExtensions,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import { isEmpty, without } from 'lodash';
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
  const [selectedBlock, setSelectedBlock] = useState(null);
  const {
    data = {},
    block = null,
    selected,

    properties,
    onChangeBlock,

    onChangeField,
    pathname,
    metadata = null,
  } = props;
  const { copyright, copyrightIcon, copyrightPosition } = data;
  const copyrightPrefix = config.blocks.blocksConfig.hero.copyrightPrefix || '';
  const schema = React.useMemo(() => {
    if (isFunction(HeroBlockSchema)) {
      return HeroBlockSchema(props);
    }
    return HeroBlockSchema;
  }, [props]);

  const blockState = {};
  const data_blocks = data?.data?.blocks;
  const id = uuid();
  const childBlocksForm = isEmpty(data_blocks)
    ? data.text
      ? {
          blocks: {
            [id]: {
              '@type': 'slate',
              value: data.text,
            },
          },
          blocks_layout: { items: [id] },
        }
      : emptyBlocksForm()
    : data.data;

  return (
    <>
      <BodyClass className="with-hero-block" />

      <Hero {...data}>
        <Hero.Text {...data}>
          <BlocksForm
            metadata={properties || metadata}
            properties={childBlocksForm}
            manage={false}
            allowedBlocks={'slate'}
            selectedBlock={selected ? selectedBlock : null}
            title={data.placeholder}
            onSelectBlock={(id) => {
              setSelectedBlock(id);
            }}
            onChangeFormData={(newFormData) => {
              onChangeBlock(block, {
                ...data,
                data: newFormData,
              });
            }}
            onChangeField={(id, value) => {
              if (['blocks', 'blocks_layout'].indexOf(id) > -1) {
                blockState[id] = value;
                if (data.text) delete data.text;
                onChangeBlock(block, {
                  ...data,
                  data: {
                    ...data.data,
                    ...blockState,
                  },
                });
              } else {
                onChangeField(id, value);
              }
            }}
            pathname={pathname}
          >
            {({ draginfo }, editBlock, blockProps) => (
              <EditBlockWrapper
                draginfo={draginfo}
                blockProps={blockProps}
                disabled={data.disableInnerButtons}
              >
                {editBlock}
              </EditBlockWrapper>
            )}
          </BlocksForm>
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
