import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { formatStr } from "../utils/formatStr";
import { useState } from "react";

type TabItemProps = {
  title: string;
  description: string;
};

type TabSectionTitleProps = {
  children: React.ReactNode;
};

type ConditionalTitleProps =
  | {
      hasTitle: true;
      isTablistWithTitle: boolean;
      children: React.ReactNode;
    }
  | {
      hasTitle?: false;
      isTablistWithTitle: never;
      children?: never;
    };

type DataProps = {
  data: { [key: string]: TabItemProps[] };
};

type TabSectionProps = DataProps & ConditionalTitleProps;

export default function TabSection({
  data,
  hasTitle,
  isTablistWithTitle,
  children,
}: TabSectionProps & ConditionalTitleProps) {
  return (
    <Tabs>
      {hasTitle && isTablistWithTitle && (
        <>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between lg:text-left">
            {children}

            <TabList
              className={
                "flex w-fit flex-row justify-center gap-2 rounded-md border border-accent/10 p-4"
              }
            >
              {Object.keys(data).map((item, index) => {
                return <Tab key={"tab-" + item + index}>{item}</Tab>;
              })}
            </TabList>
          </div>

          {Object.keys(data).map((key, index) => (
            <TabPanel key={`panel-${key}-${index}`}>
              {data[key].map((item) => (
                <div
                  key={`panel-item-${item.title.split(" ").join("-").toLowerCase()}`}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                    icon
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </TabPanel>
          ))}
        </>
      )}

      {hasTitle && !isTablistWithTitle && (
        <>
          {children}

          <div
            id="grid-panel"
            className="flex flex-col items-center gap-8 lg:flex-row lg:items-start"
          >
            <TabList className="flex h-fit w-fit flex-row justify-center gap-2 rounded-md border border-accent/10 p-4 lg:flex-col">
              {Object.keys(data).map((item, index) => {
                return <Tab key={"tab-" + item + index}>{formatStr(item)}</Tab>;
              })}
            </TabList>

            {Object.keys(data).map((key, index) => (
              <TabPanel key={`panel-${key}-${index}`} className="hidden">
                {data[key].map((item) => (
                  <div
                    key={`panel-item-${item.title.split(" ").join("-").toLowerCase()}`}
                    className="flex flex-col items-center gap-4 rounded-md border border-accent/10 p-4"
                  >
                    <div className="mx-auto flex rounded-md border border-accent/10 p-4">
                      icon
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </TabPanel>
            ))}
          </div>
        </>
      )}
    </Tabs>
  );
}

export const TabSectionTitle = ({ children }: TabSectionTitleProps) => {
  return <div className="flex flex-col gap-4 lg:text-left">{children}</div>;
};
