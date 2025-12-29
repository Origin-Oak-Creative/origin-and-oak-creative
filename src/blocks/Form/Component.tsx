import type { FormBlock as FormBlockProps } from '@/payload-types';
import { ClientFormBlock } from './Component.client';

export const FormBlock: React.FC<FormBlockProps> = ({
  form,
  introContent,
  enableIntro,
  blockType,
  blockName,
}) => {
  if (typeof form === 'object')
    return (
      <ClientFormBlock
        form={form}
        introContent={introContent}
        enableIntro={enableIntro}
        blockType={blockType}
        blockName={blockName}
      />
    );

  return null;
};
