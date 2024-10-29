import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

type TabItemProps = {
  title: string;
  description: string;
};

type ConditionalTitleProps =
  | {
      hasTitle: true;
      children: React.ReactNode;
    }
  | {
      hasTitle?: false;
      children?: never;
    };

type DataProps = {
  data: { [key: string]: TabItemProps[] };
};

type TabSectionProps = DataProps & ConditionalTitleProps;

export default function TabSection({
  data,
  hasTitle,
  children,
}: TabSectionProps & ConditionalTitleProps) {
  return (
    <Tabs>
      {hasTitle && <>{children}</>}

      <TabList>
        {Object.keys(data).map((item, index) => {
          return <Tab key={"tab-" + item + index}>{item}</Tab>;
        })}
      </TabList>

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
    </Tabs>
  );
}
