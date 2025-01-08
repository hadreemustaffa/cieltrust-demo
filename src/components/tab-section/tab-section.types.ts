import React from 'react';

export type TitleProps =
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

export interface Data {
  name: string;
  list: {
    title: string;
    description: string;
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
}

export interface TabSectionProps {
  data: Data[];
}

export interface TabPanelItemProps {
  title: string;
  description: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
