import React from 'react';

interface Props {
  image: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: 'auto' | 'high' | 'low';
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    image,
    alt,
    height,
    width,
  } = props;

  const loading = loadingFromProps || 'lazy';
  const priority = priorityFromProps || 'low';

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={alt}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      src={image}
      height={height}
      width={width}
    />
  );
};
