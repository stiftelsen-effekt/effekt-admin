import React, { useState } from 'react';
import { EffektCheckFormWrapper } from './effekt-check-form.component.style';
import { EffektCheck } from './effekt-check.component';

export interface EffektCheckChoice {
  label: string;
  value: any;
  selected: boolean;
}

interface IProps {
  choices: Array<EffektCheckChoice>;
  azure?: boolean;
  allChecked?: boolean;
  onChange(value: number, checked: boolean): void;
}

export const EffektCheckForm: React.FunctionComponent<IProps> = ({ choices, azure, allChecked, onChange}) => {
  const azureColor: boolean = azure ? true : false;
 
  choices.push({label: "select all", value: 99, selected: allChecked} as EffektCheckChoice);

  let checkBoxes = choices.map((choice, index) => (
    <EffektCheck
      key={index}
      label={choice.label}
      checked={choice.selected}
      azure={azureColor}
      onChange={(now_checked) => {onChange(choice.value, now_checked)}}
    ></EffektCheck>
  ));
  return <EffektCheckFormWrapper>{checkBoxes}</EffektCheckFormWrapper>;
};