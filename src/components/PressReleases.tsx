import { pressReleases } from "../data/pressReleases";
import { LinkButtonTertiary } from "./Button";

import { CardImage } from "./Card";

type PressReleasesArticleProps = {
  id: number;
  title: string;
  location: string;
  date: string;
  text: string;
};

function PressReleases() {
  return (
    <>
      <div className="flex max-w-[85ch] flex-col gap-4 lg:text-left">
        <h2 className="text-2xl font-semibold">
          <span>Press Releases</span>
        </h2>
        <p>
          Stay updated with the latest happenings and exciting developments at
          YourBank through our press releases.
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
}) => {
  return (
    <article className="flex flex-col items-start justify-between gap-8 rounded-md text-left">
      <div className="flex flex-col gap-4">
        <CardImage
          imgPath={`about-press-article-${id}`}
          imgFormat="png"
          imgAlt=""
        />
        <header className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            <LinkButtonTertiary
              to={`/yourbank/press-releases/${id}`}
              isPaddingless
            >
              {title}
            </LinkButtonTertiary>
          </h3>
          <div className="flex flex-row flex-wrap gap-2">
            <p className="w-fit rounded-md border border-accent/10 p-2">
              <strong>Location</strong>: {location}
            </p>
            <p className="w-fit rounded-md border border-accent/10 p-2">
              <strong>Date</strong>: {date}
            </p>
          </div>
        </header>

        <p>{text}</p>
      </div>
    </article>
  );
};

export default PressReleases;
