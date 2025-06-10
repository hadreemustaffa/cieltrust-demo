import React from 'react';

import { LinkButtonTertiary } from '@/components/button';
import Image from '@/components/image';

import { pressReleases } from '@/data/pressReleases';

type PressReleasesArticleProps = {
  id: number;
  title: string;
  location: string;
  date: string;
  text: string;
  imageDesktop: string;
  imageLaptop: string;
  imageMobile: string;
};

export default function PressReleases() {
  return (
    <>
      <div className="flex max-w-[85ch] flex-col gap-4 lg:text-left">
        <h2 className="text-2xl font-semibold">
          <span>Press Releases</span>
        </h2>
        <p>
          Stay updated with the latest happenings and exciting developments at Cieltrust through our press releases.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
        {pressReleases.map((release) => (
          <PressReleasesArticle
            key={release.id}
            id={release.id}
            title={release.title}
            location={release.location}
            date={release.date}
            text={release.text}
            imageDesktop={release.imageDesktop}
            imageLaptop={release.imageLaptop}
            imageMobile={release.imageMobile}
          />
        ))}
      </div>
    </>
  );
}

const PressReleasesArticle: React.FC<PressReleasesArticleProps> = ({
  id,
  title,
  location,
  date,
  text,
  imageDesktop,
  imageLaptop,
  imageMobile,
}) => {
  return (
    <article className="flex flex-col items-start justify-between gap-8 rounded-md text-left">
      <div className="flex flex-col gap-4">
        <Image mobile={imageMobile} laptop={imageLaptop} desktop={imageDesktop} alt={title} loading="lazy" />

        <header className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            <LinkButtonTertiary to={`/press-releases/${id}`}>{title}</LinkButtonTertiary>
          </h3>
          <div className="flex flex-row flex-wrap gap-2">
            <p className="border-accent/10 w-fit rounded-md border p-2">
              <strong>Location</strong>: {location}
            </p>
            <p className="border-accent/10 w-fit rounded-md border p-2">
              <strong>Date</strong>: {date}
            </p>
          </div>
        </header>

        <p>{text}</p>
      </div>
    </article>
  );
};
