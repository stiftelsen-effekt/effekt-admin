import React, { ReactElement, useState } from "react"
import { TabHeaders } from "./EffektTabs.style"

export const EffektTabs: React.FC<{ children: ReactElement[] }> = ({ children }) => {
  let [selectedTab, setSelectedTab] = useState(0)

  const renderedTab = children
    .filter(child => (child as any).type.name === "EffektTab")
    .filter((child, i) => i === selectedTab)

  if (renderedTab.length !== 1) {
    return <div>Could not find tab with index {selectedTab}</div>
  }

  const headers = children
    .filter(child => (child as any).type.name === "EffektTabHeader")
    .map((child, i) => React.cloneElement(child, { 
      ...child.props,
      key: i,
      selected: i === selectedTab,
      onClick: () => {
        setSelectedTab(i)
      }
    }))

  return (
    <div>
      <TabHeaders>
        {headers}
      </TabHeaders>
      <div>
        {renderedTab}
      </div>
    </div>
  )
}