import React, { useState } from 'react';
import cx from 'classnames';
import isFunction from 'lodash/isFunction';
import { Icon } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { BlocksForm } from '@plone/volto/components';
import EditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/EditBlockWrapper';
import { v4 as uuid } from 'uuid';
import '@eeacms/volto-hero-block/components/Blocks/Hero/edit.css';

import { isEmpty } from 'lodash';
import {
  BlockDataForm,
  SidebarPortal,
  UniversalLink,
} from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { getFieldURL } from '@plone/volto/helpers/Url/Url';
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
  const id = uuid();
  const [selectedBlock, setSelectedBlock] = useState(id);
  const {
    data = {},
    block = null,
    selected,
    properties,
    onChangeBlock,
    onChangeField,
    pathname,
    metadata = null,
    setSidebarTab,
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

  // Move the data migration logic to useEffect to avoid setState during render
  // this happens when the component is first rendered such as on block creation
  React.useEffect(() => {
    if (data?.text || isEmpty(data_blocks)) {
      let dataWithoutText = { ...data };
      if (dataWithoutText) delete dataWithoutText.text;

      onChangeBlock(block, {
        ...dataWithoutText,
        data: data?.text
          ? {
              blocks: {
                [id]: {
                  '@type': 'slate',
                  value: data.text,
                  plaintext: data.text?.[0].children?.[0].text,
                },
              },
              blocks_layout: { items: [id] },
            }
          : {
              blocks: {
                [id]: {
                  '@type': 'slate',
                  value: [{ type: 'h2', children: [{ text: '' }] }],
                  plaintext: '',
                },
              },
              blocks_layout: { items: [id] },
            },
      });
    }
  }, [data?.text, data_blocks, id, onChangeBlock, block, data]);

  return (
    <>
      <BodyClass className="with-hero-block" />
      <div
        className="hero-edit-wrapper"
        role="presentation"
        onClick={(e) => {
          const className = e.target.getAttribute('class');
          if (className && className.includes('hero')) {
            setSelectedBlock(id);
            setSidebarTab(1);
          }
        }}
      >
        <Hero {...data}>
          <Hero.Text {...data}>
            <BlocksForm
              metadata={properties || metadata}
              properties={data.data || {}}
              manage={false}
              allowedBlocks={'slate'}
              selectedBlock={selectedBlock}
              title={data.placeholder}
              onSelectBlock={(s) => {
                setSelectedBlock(s);
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
      </div>
      <SidebarPortal selected={selected}>
        <BlockDataForm
          block={block}
          schema={schema}
          title={schema.title}
          onChangeBlock={props.onChangeBlock}
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
