export type TabPanelItemProps = {
  title: string;
  description: string;
};
export const TabPanelItem: React.FC<TabPanelItemProps> = ({
  title,
  description,
}) => {
  return (
    <div
      key={`panel-item-${title.split(" ").join("-").toLowerCase()}`}
      className="flex flex-col items-start gap-4 rounded-md border border-accent/10 p-4 text-left"
    >
      <div className="flex w-full flex-row items-center justify-between">
        <h3>{title}</h3>
        <div className="flex rounded-md border border-accent/10 p-4">icon</div>
      </div>
      <p>{description}</p>
    </div>
  );
};
