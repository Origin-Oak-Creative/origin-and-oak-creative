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
  // BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  ContentBlock as ContentBlockProps,
  IconInlineBlock as IconInlineBlockProps,
  LinkButtonInlineBlock as LinkButtonInlineBlockProps,
} from '@/payload-types';

import {
  TEXT_STATE_CONFIGS,
  type ConfigType,
  type StyleDefinition,
} from '@/fields/textStateConfig';
// import { BannerBlock } from '@/blocks/Banner/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { ContentBlock } from '@/blocks/Content/Component';
import { IconInlineBlock } from '@/inlineBlocks/Icon/Component';
import { LinkButtonInlineBlock } from '@/inlineBlocks/LinkButton/Component';

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | ContentBlockProps>
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
): React.CSSProperties => {
  const finalStyles: Record<string, string> = {};
  if (!metadata) return {};

  const activeConfig = TEXT_STATE_CONFIGS[context];

  // We type the categories strictly based on the keys of the active configuration
  const categories = Object.keys(activeConfig) as Array<keyof typeof activeConfig>;

  categories.forEach((category) => {
    const selectedId = metadata[category as string];

    if (selectedId) {
      const categoryMap = activeConfig[category];

      // Check if selectedId is a valid key of the categoryMap
      if (Object.prototype.hasOwnProperty.call(categoryMap, selectedId)) {
        // We use indexed access here.
        // TypeScript now knows that categoryMap[selectedId] is a valid lookup
        const definition = categoryMap[
          selectedId as keyof typeof categoryMap
        ] as unknown as StyleDefinition;

        if (definition && definition.css) {
          Object.entries(definition.css).forEach(([key, value]) => {
            finalStyles[key.replace(/-./g, (x) => x[1].toUpperCase())] = value;
          });
        }
      }
    }
  });

  return finalStyles as React.CSSProperties;
};

const jsxConverters = (type: ConfigType): JSXConverters<NodeTypes> => {
  return {
    ...defaultJSXConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    blocks: {
      // banner: ({ node }) => <BannerBlock {...node.fields} />,
      content: ({ node }) => <ContentBlock {...node.fields} />,
      cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    },
    inlineBlocks: {
      icon: ({ node }) => <IconInlineBlock {...node.fields} />,
      linkButton: ({ node }) => <LinkButtonInlineBlock {...node.fields} />,
    },
    text: ({ node }) => {
      const metadata = node.$ as Record<string, string> | undefined;
      const styles = parseLexicalStyle(metadata || {}, type);

      let element = <span style={styles}>{node.text}</span>;

      if (node.format & IS_BOLD) {
        element = <strong>{element}</strong>;
      }
      if (node.format & IS_ITALIC) {
        element = <em>{element}</em>;
      }
      if (node.format & IS_UNDERLINE) {
        element = <span style={{ textDecoration: 'underline' }}>{element}</span>;
      }
      if (node.format & IS_STRIKETHROUGH) {
        element = <span style={{ textDecoration: 'line-through' }}>{element}</span>;
      }
      if (node.format & IS_CODE) {
        element = <code>{element}</code>;
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
  const { className, enableProse = true, enableGutter = true, type = 'content', ...rest } = props;
  return (
    <ConvertRichText
      converters={() => jsxConverters(type)}
      className={'payload-richtext' + ' ' + className}
      {...rest}
    />
  );
}
