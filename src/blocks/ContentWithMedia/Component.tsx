import React from 'react';

import { ContentWithMediaBlock as ContentWithMediaBlockProps } from '@/payload-types';

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

// import styles from './style.module.css';

export const ContentWithMediaBlock: React.FC<ContentWithMediaBlockProps> = ({
  width,
  heading,
  textDirection,
  content,
  image,
}) => {
  return (
    <div className={width}>
      {heading && <RichText data={heading} enableGutter={false} />}
      <div className={textDirection}>
        <RichText data={content} enableGutter={false} />
        <Media resource={image.media} className={image.style} />
      </div>
    </div>
  );
};
