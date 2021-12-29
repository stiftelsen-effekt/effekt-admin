import React, { ReactNode } from "react"
import { TabHeaderCounter, TabHeaderWrapper } from "./EffektTabHeader.style"

export const EffektTabHeader: React.FC<{ 
  label: string,
  selected?: boolean,
  children?: ReactNode[],
  counter?: number, 
  loading?: boolean,
  onClick?: () => void }> = ({ children, label, selected, onClick, counter, loading }) => {
  return (
    <TabHeaderWrapper onClick={onClick} selected={selected}>
      <span>{label}</span>
      {children}
      {typeof counter !== "undefined" && <TabHeaderCounter>{counter}</TabHeaderCounter>}
    </TabHeaderWrapper>
  )
}