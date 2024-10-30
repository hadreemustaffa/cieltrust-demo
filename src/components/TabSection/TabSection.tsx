import { formatStr } from "../../utils/formatStr";

// components import
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { TabPanelItem, TabPanelItemProps } from "./TabPanelItem";

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
  data: { [key: string]: TabPanelItemProps[] };
};

type TabSectionProps = DataProps & ConditionalTitleProps;

const TabSection: React.FC<TabSectionProps & ConditionalTitleProps> = ({
  data,
  hasTitle,
  isTablistWithTitle,
  children,
}) => {
  return (
    <Tabs>
      {hasTitle && isTablistWithTitle && (
        <>
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between lg:text-left">
            {children}

            <TabList>
              {Object.keys(data).map((item, index) => {
                return <Tab key={"tab-" + item + index}>{item}</Tab>;
              })}
            </TabList>
          </div>

          {Object.keys(data).map((key, index) => (
            <TabPanel key={`panel-${key}-${index}`}>
              {data[key].map((item) => (
                <TabPanelItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                />
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
            <TabList>
              {Object.keys(data).map((item, index) => {
                return <Tab key={"tab-" + item + index}>{formatStr(item)}</Tab>;
              })}
            </TabList>

            {Object.keys(data).map((key, index) => (
              <TabPanel key={`panel-${key}-${index}`} className="hidden">
                {data[key].map((item) => (
                  <TabPanelItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </TabPanel>
            ))}
          </div>
        </>
      )}
    </Tabs>
  );
};

export default TabSection;
