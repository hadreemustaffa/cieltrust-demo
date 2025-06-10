import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { cn } from '@/utils/cn';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  mobile: string;
  laptop: string;
  desktop: string;
}

export default function Image({ alt, mobile, laptop, desktop, className, ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <picture className="relative w-full">
      {isLoading && <Skeleton height={320} />}
      <source srcSet={desktop} media="(min-width: 1440px)" />
      <source srcSet={laptop} media="(min-width: 768px)" />
      <img
        className={cn(
          `aspect-4/3 w-full object-cover shadow-xs transition-opacity duration-500 ${isLoading ? 'absolute inset-0 opacity-0' : 'block opacity-100'}`,
          className,
        )}
        src={mobile}
        alt={alt}
        onLoad={handleImageLoad}
        {...props}
      />
    </picture>
  );
}
