import React, { ReactElement, useState } from "react";
import { TabContents, TabHeaders } from "./EffektTabs.style";

export const EffektTabs: React.FC<{
  children: [
    ReactElement<{ children: ReactElement[] }>,
    ReactElement<{ children: ReactElement[] }>,
  ];
}> = ({ children }) => {
  let [selectedTab, setSelectedTab] = useState(0);

  const renderedTab = children[1].props.children.filter((child, i) => i === selectedTab);

  if (renderedTab.length !== 1) {
    return <div>Could not find tab with index {selectedTab}</div>;
  }

  const headers = children[0].props.children.map((child, i) =>
    React.cloneElement(child, {
      ...child.props,
      key: i,
      selected: i === selectedTab,
      onClick: () => {
        setSelectedTab(i);
      },
    }),
  );

  return (
    <div>
      <TabHeaders>{headers}</TabHeaders>
      <TabContents>{renderedTab}</TabContents>
    </div>
  );
};
