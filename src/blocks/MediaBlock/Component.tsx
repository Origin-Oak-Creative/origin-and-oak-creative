import type { StaticImageData } from 'next/image';

import React from 'react';

import type { MediaBlock as MediaBlockProps } from '@/payload-types';

import { Media } from '../../components/Media';

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const { imgClassName, media, staticImage } = props;

  return (
    <>
      {(media || staticImage) && (
        <Media imgClassName={imgClassName} resource={media} src={staticImage} />
      )}
    </>
  );
};
