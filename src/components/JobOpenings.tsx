import { jobOpenings } from "../data/jobOpenings";
import { LinkButtonPrimary } from "./Button";

type JobArticleProps = {
  title: string;
  location: string;
  department: string;
  about: string;
  requirements: string[];
};

function JobOpenings() {
  return (
    <>
      <div className="flex max-w-[80ch] flex-col gap-4 lg:text-left">
        <h2 className="text-2xl font-semibold">
          <span>Job Openings</span>
        </h2>
        <p>
          Explore exciting job openings at Yourbank, where we value talent,
          innovation, and a passion for customer service. Join our team and be
          part of shaping a brighter future in the banking industry
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
        {jobOpenings.map((job) => (
          <JobArticle
            key={job.title}
            title={job.title}
            location={job.location}
            department={job.department}
            about={job.about}
            requirements={job.requirements}
          />
        ))}
      </div>
    </>
  );
}

const JobArticle: React.FC<JobArticleProps> = ({
  title,
  location,
  department,
  about,
  requirements,
}) => {
  return (
    <article className="flex flex-col items-start justify-between gap-8 rounded-md border border-accent/10 bg-surface p-4 text-left">
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex flex-row flex-wrap gap-2">
            <p className="w-fit rounded-md border border-accent/10 bg-card p-2">
              <strong>Location</strong>: {location}
            </p>
            <p className="w-fit rounded-md border border-accent/10 bg-card p-2">
              <strong>Department</strong>: {department}
            </p>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">About This Job</h3>
          <p>{about}</p>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            Requirements & Qualifications
          </h3>

          <ul className="flex flex-col gap-2">
            {requirements.map((requirement) => (
              <li className="grid grid-cols-[auto_1fr] items-center gap-2">
                <svg
                  width="24"
                  height="34"
                  viewBox="0 0 35 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5454 21.1814C14.5908 21.1814 14.0316 20.644 14.0316 19.6796V18.5637C10.0221 18.2881 6.02625 17.4615 1.88037 15.877V13.6038C6.98089 15.8633 12.0951 16.6624 17.6593 16.6624C23.2372 16.6624 28.3513 15.8633 33.4518 13.6038V15.877C29.3059 17.4615 25.31 18.2881 21.3006 18.5637V19.6796C21.3006 20.644 20.7414 21.1814 19.7867 21.1814H15.5454ZM6.09444 30.3432H29.2377C32.0608 30.3432 33.4518 28.9656 33.4518 26.1412V12.7359C33.4518 9.9115 32.0608 8.53378 29.2377 8.53378H6.09444C3.28506 8.53378 1.88037 9.9115 1.88037 12.7359V26.1412C1.88037 28.9656 3.28506 30.3432 6.09444 30.3432ZM10.7449 9.7324H12.8588V7.29382C12.8588 6.24673 13.4725 5.65431 14.5362 5.65431H20.7959C21.8597 5.65431 22.4598 6.24673 22.4598 7.29382V9.70485H24.5736V7.44537C24.5736 4.85523 23.2234 3.64282 20.7551 3.64282H14.5635C12.2314 3.64282 10.7449 4.85523 10.7449 7.44537V9.7324Z"
                    fill="currentColor"
                  />
                </svg>

                <p>{requirement}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <LinkButtonPrimary to="/careers/apply">Apply Now</LinkButtonPrimary>
    </article>
  );
};

export default JobOpenings;
