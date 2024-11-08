import React from "react";
import Icon from "../Icon";

export type TabPanelItemProps = {
  title: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const TabPanelItem: React.FC<TabPanelItemProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div
      key={`panel-item-${title.split(" ").join("-").toLowerCase()}`}
      className="flex flex-col items-start gap-4 rounded-md border border-accent/10 p-4 text-left"
    >
      <div className="flex w-full flex-row items-center justify-between gap-2">
        <h3>{title}</h3>
        <Icon SvgIcon={icon} />
      </div>
      <p>{description}</p>
    </div>
  );
};
