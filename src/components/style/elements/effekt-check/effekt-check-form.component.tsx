import React from 'react';
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
  onChange(selected: Array<number>): void;
}

export const EffektCheckForm: React.FunctionComponent<IProps> = ({ choices, azure, onChange}) => {
  const azureColor: boolean = azure ? true : false;

  const isAllChecked 

  let checkBoxes = choices.map((choice, index) => (
    <EffektCheck
      key={index}
      label={choice.label}
      checked={choice.selected}
      azure={azureColor}
      onChange={(now_checked) => {
        choices.filter(choice => (choice.selected) && ! ).map(choice => choice.value)
      }}
    ></EffektCheck>
  ));
  return <EffektCheckFormWrapper>
    <span onClick={() => { onChange(choices.map(choice =>)) }}>Select all</span>
    {checkBoxes}
  </EffektCheckFormWrapper>;
};