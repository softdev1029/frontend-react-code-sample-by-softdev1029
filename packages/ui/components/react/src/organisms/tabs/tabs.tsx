import type { O, U, F } from "@softdev1029/type-utils";
import { constant, identity } from "lodash/fp";
import type { FunctionComponent, ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";
// import "react-tabs/style/react-tabs.css";
import type {
  TabProps as ReactTabProps,
  TabsProps as ReactTabsProps,
  TabPanelProps,
} from "react-tabs";
import {
  Tab as ReactTab,
  Tabs as ReactTabs,
  TabList,
  TabPanel,
} from "react-tabs";

export type TabProps = O.Omit<ReactTabProps, "children" | "ref"> & {
  children?: TabPanelProps["children"];
  panel?: O.Omit<TabPanelProps, "children" | "ref">;
  title?: ReactNode;
};

export const Tab: FunctionComponent<TabProps> = () => null;

export type TabElement = ReactElement<TabProps, typeof Tab>;

const isTabElement = (object: U.Nullable<{}>): object is TabElement =>
  isValidElement<TabProps>(object) && object.type === Tab;

const renderTabElement = (
  renderTab: F.Func<[element: TabElement], ReactNode>,
  renderOther: F.Func<[node: ReactNode], ReactNode>
) => (node: ReactNode): ReactNode =>
  isTabElement(node) ? renderTab(node) : renderOther(node);

const renderTab = renderTabElement(
  ({
    key,
    props: { children, panel, title, ...props },
  }: TabElement): ReactNode => (
    <ReactTab key={key} {...props}>
      {title}
    </ReactTab>
  ),
  constant(null)
);

const renderPanel = renderTabElement(
  ({ key, props: { children, panel: props } }: TabElement): ReactNode => (
    <TabPanel key={key} {...props}>
      {children}
    </TabPanel>
  ),
  identity
);

export type TabsProps = O.Omit<ReactTabsProps, "children"> & {
  children: ReactNode;
};

export const Tabs: FunctionComponent<TabsProps> = ({ children, ...props }) => (
  <ReactTabs {...props}>
    <TabList>{Children.map(children, renderTab)}</TabList>
    {Children.map(children, renderPanel)}
  </ReactTabs>
);
