import TabSection from '@/components/tab-section';
import { TabSectionTitle } from '@/components/tab-section-title';

import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <TabSection hasTitle isTablistWithTitle={true} data={testimonials}>
      <TabSectionTitle>
        <h2 className="text-2xl font-semibold">
          Our <span className="text-brand">Testimonials</span>
        </h2>

        <p>
          Discover how YourBank has transformed lives with innovative digital solutions and personalized customer
          service. See why our clients trust us for a secure and prosperous financial journey
        </p>
      </TabSectionTitle>
    </TabSection>
  );
}
