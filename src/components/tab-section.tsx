// components import
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { formatStr } from '@/utils/formatStr';

import TabPanelItem from '@/components/tab-section-panel-item';

type TitleProps =
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

interface Data {
  name: string;
  list: {
    title: string;
    description: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
}

interface TabSectionProps {
  data: Data[];
}

export default function TabSection({ data, hasTitle, isTablistWithTitle, children }: TabSectionProps & TitleProps) {
  return (
    <Tabs>
      {hasTitle && isTablistWithTitle && (
        <>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between lg:text-left">
            {children}

            <TabList>
              {data.map((tab, index) => {
                return <Tab key={'tab-' + tab + index}>{formatStr(tab.name)}</Tab>;
              })}
            </TabList>
          </div>

          {data.map((tab, index) => (
            <TabPanel key={`panel-${tab}-${index}`}>
              {tab.list.map((item) => (
                <TabPanelItem key={item.title} title={item.title} description={item.description} icon={item.icon} />
              ))}
            </TabPanel>
          ))}
        </>
      )}

      {hasTitle && !isTablistWithTitle && (
        <>
          {children}

          <div id="grid-panel" className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
            <TabList>
              {data.map((tab, index) => {
                return <Tab key={'tab-' + tab + index}>{formatStr(tab.name)}</Tab>;
              })}
            </TabList>

            {data.map((tab, index) => (
              <TabPanel key={`panel-${tab}-${index}`} className="hidden">
                {tab.list.map((item) => (
                  <TabPanelItem key={item.title} title={item.title} description={item.description} icon={item.icon} />
                ))}
              </TabPanel>
            ))}
          </div>
        </>
      )}
    </Tabs>
  );
}
