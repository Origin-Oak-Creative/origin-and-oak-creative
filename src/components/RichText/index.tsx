import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedInlineBlockNode,
  SerializedLinkNode,
  DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical';

import {
  type JSXConverters,
  defaultJSXConverters,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react';

import type {
  LinkGroupBlock as LinkGroupBlockProps,
  IconInlineBlock as IconInlineBlockProps,
  LinkButtonInlineBlock as LinkButtonInlineBlockProps,
} from '@/payload-types';

import { TEXT_STATE_CONFIGS, type ConfigType } from '@/fields/textStateConfig';
import { LinkGroupBlock } from '@/blocks/LinkGroup/Component';
import { IconInlineBlock } from '@/inlineBlocks/Icon/Component';
import { LinkButtonInlineBlock } from '@/inlineBlocks/LinkButton/Component';

import styles from './style.module.css';

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<LinkGroupBlockProps>
  | SerializedInlineBlockNode<IconInlineBlockProps | LinkButtonInlineBlockProps>;

// Lexical bitwise format constants
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`;
};

const parseLexicalStyle = <T extends ConfigType>(
  metadata: Record<string, string>,
  context: T,
): string => {
  const classNames: string[] = [];
  if (!metadata) return '';

  const activeConfig = TEXT_STATE_CONFIGS[context];

  // We type the categories strictly based on the keys of the active configuration
  const categories = Object.keys(activeConfig) as Array<keyof typeof activeConfig>;

  categories.forEach((category) => {
    const selectedId = metadata[category as string];

    if (selectedId && styles[selectedId]) {
      classNames.push(styles[selectedId]);
    }
  });

  return classNames.join(' ');
};

const jsxConverters = (type: ConfigType): JSXConverters<NodeTypes> => {
  return {
    ...defaultJSXConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    blocks: {
      linkGroup: ({ node }) => <LinkGroupBlock {...node.fields} />,
    },
    inlineBlocks: {
      icon: ({ node }) => <IconInlineBlock {...node.fields} />,
      linkButton: ({ node }) => <LinkButtonInlineBlock {...node.fields} />,
    },
    text: ({ node }) => {
      const metadata = node.$ as Record<string, string> | undefined;
      const classNames = parseLexicalStyle(metadata || {}, type);

      let element: React.ReactNode = node.text;

      if (node.format & IS_BOLD) element = <strong>{element}</strong>;

      if (node.format & IS_ITALIC) element = <em>{element}</em>;

      if (node.format & IS_UNDERLINE || node.format & IS_UNDERLINE) {
        const textDecoration = [
          node.format & IS_UNDERLINE ? 'underline' : '',
          node.format & IS_STRIKETHROUGH ? 'line-through' : '',
        ]
          .filter(Boolean)
          .join(' ');

        element = <span style={{ textDecoration }}>{element}</span>;
      }

      if (node.format & IS_CODE) element = <code>{element}</code>;

      if (classNames) {
        return <span className={classNames}>{element}</span>;
      }

      return element;
    },
  };
};

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
  type?: ConfigType;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { enableProse = true, enableGutter = true, type = 'content', ...rest } = props;
  return (
    <ConvertRichText
      converters={() => jsxConverters(type)}
      className={'payload-richtext' + ' ' + styles[type]}
      {...rest}
    />
  );
}
