import React from 'react';

import { LinkButtonPrimary } from '@/components/button';
import Icon from '@/components/icon';
import { jobOpenings } from '@/data/jobOpenings';
import Briefcase from '@/images/icons/briefcase.svg?react';

type JobArticleProps = {
  title: string;
  location: string;
  department: string;
  about: string;
  requirements: string[];
};

export default function JobOpenings() {
  return (
    <>
      <div className="flex max-w-[80ch] flex-col gap-4 lg:text-left">
        <h2 className="text-2xl font-semibold">
          <span>Job Openings</span>
        </h2>
        <p>
          Explore exciting job openings at CielTrust, where we value talent, innovation, and a passion for customer
          service. Join our team and be part of shaping a brighter future in the banking industry
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

const JobArticle: React.FC<JobArticleProps> = ({ title, location, department, about, requirements }) => {
  return (
    <article className="flex flex-col items-start justify-between gap-8 rounded-md border border-accent/10 p-4 text-left">
      <div className="flex flex-col gap-4">
        <header className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex flex-row flex-wrap gap-2">
            <p className="w-fit rounded-md border border-accent/10 p-2">
              <strong>Location</strong>: {location}
            </p>
            <p className="w-fit rounded-md border border-accent/10 p-2">
              <strong>Department</strong>: {department}
            </p>
          </div>
        </header>

        <section className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">About This Job</h4>
          <p>{about}</p>
        </section>

        <section className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Requirements & Qualifications</h4>

          <ul className="flex flex-col gap-2">
            {requirements.map((requirement, index) => (
              <li key={index} className="grid grid-cols-[auto_1fr] items-center gap-2">
                <Icon SvgIcon={Briefcase} isBorderless />
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
