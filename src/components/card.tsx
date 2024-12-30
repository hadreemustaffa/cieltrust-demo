import React from 'react';

type CardImageProps = {
  imgPath: string;
  imgFormat: 'png' | 'jpg' | 'webp' | 'jpeg';
  imgAlt: string;
};

type CardTextProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center lg:relative lg:flex-col">{children}</div>;
}

export const CardImage: React.FC<CardImageProps> = ({ imgPath, imgFormat, imgAlt }) => {
  return (
    <picture className="basis-1/2">
      <source
        media="(min-width: 1440px)"
        srcSet={`../images/illustrations/${imgPath}-desktop.${imgFormat}`}
        type={`image/${imgFormat}`}
      />
      <source
        media="(min-width: 768px)"
        srcSet={`../images/illustrations/${imgPath}-laptop.${imgFormat}`}
        type={`image/${imgFormat}`}
      />
      <img
        className="aspect-4/3 w-full object-cover"
        srcSet={`../images/illustrations/${imgPath}-mobile.${imgFormat}`}
        alt={imgAlt}
      />
    </picture>
  );
};

export const CardText = ({ title, children }: CardTextProps) => {
  return (
    <div className="flex max-w-[50ch] basis-1/2 flex-col gap-2 bg-background p-2 lg:p-4 lg:pl-0 lg:text-left xl:absolute xl:bottom-0 xl:left-0 xl:p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      {children}
    </div>
  );
};
