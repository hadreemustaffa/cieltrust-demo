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
    <div className="relative w-full">
      {isLoading && <Skeleton height={320} />}
      <img
        className={cn(
          `aspect-4/3 w-full object-cover shadow-sm transition-opacity duration-500 ${isLoading ? 'absolute inset-0 opacity-0' : 'block opacity-100'}`,
          className,
        )}
        src={mobile}
        srcSet={`${mobile} 480w, ${laptop} 768w, ${desktop} 1440w`}
        sizes="(min-width: 1440px) 1440px, (min-width: 768px) 768px, 100vw"
        alt={alt}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  );
}
