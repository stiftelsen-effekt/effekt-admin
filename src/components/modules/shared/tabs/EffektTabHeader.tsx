import React, { ReactNode } from 'react';
import { TabHeaderCounter, TabHeaderWrapper } from './EffektTabHeader.style';

/* eslint-disable jsx-a11y/no-distracting-elements */
export const EffektTabHeader: React.FC<{
  label: string;
  selected?: boolean;
  children?: ReactNode[];
  counter?: number | string;
  loading?: boolean;
  onClick?: () => void;
}> = ({ children, label, selected, onClick, counter, loading }) => {
  return (
    <TabHeaderWrapper onClick={onClick} selected={selected}>
      <span>{label}</span>
      {children}
      {typeof counter !== 'undefined' && (
        <TabHeaderCounter>
          {
            //@ts-ignore
            typeof counter === 'string' ? <marquee>{counter}</marquee> : counter
          }
        </TabHeaderCounter>
      )}
    </TabHeaderWrapper>
  );
};
