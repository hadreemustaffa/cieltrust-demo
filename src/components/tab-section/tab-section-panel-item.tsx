import Icon from '@/components/icon';
import { TabPanelItemProps } from '@/components/tab-section/tab-section.types';

export default function TabPanelItem({ title, description, icon }: TabPanelItemProps) {
  return (
    <div
      key={`panel-item-${title.split(' ').join('-').toLowerCase()}`}
      className="flex flex-col items-start gap-4 rounded-md border border-accent/10 p-4 text-left"
    >
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <h3>{title}</h3>
        <Icon SvgIcon={icon} />
      </div>
      <p>{description}</p>
    </div>
  );
}
