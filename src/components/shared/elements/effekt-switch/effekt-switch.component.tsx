import React from 'react';
import {
  EffektSwitchWrapper,
  EffektSwitchItem,
  EffektSwitchSlider,
} from './effekt-switch.component.style';

export enum SwitchSelected {
  LEFT,
  RIGHT,
}

interface IProps {
  left: string;
  right: string;
  selected: SwitchSelected;
  onChange(selected: SwitchSelected): void;
}

export const EffektSwitch: React.FunctionComponent<IProps> = ({
  left,
  right,
  selected,
  onChange,
}) => {
  return (
    <EffektSwitchWrapper>
      <EffektSwitchSlider state={selected} />
      <EffektSwitchItem 
        active={(selected === SwitchSelected.LEFT)}
        onClick={() => onChange(SwitchSelected.LEFT)}
      >
        {left}
      </EffektSwitchItem>
      <EffektSwitchItem 
        active={(selected === SwitchSelected.RIGHT)}
        onClick={() => onChange(SwitchSelected.RIGHT)}
      >
        >
        {right}
      </EffektSwitchItem>
    </EffektSwitchWrapper>
  );
};
