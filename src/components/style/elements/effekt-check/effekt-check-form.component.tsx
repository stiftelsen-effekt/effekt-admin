import React from 'react';
import { EffektCheckFormWrapper } from './effekt-check-form.component.style';
import { EffektCheck } from './effekt-check.component';
import { SelectAllButton } from './effekt-check.component.style';

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

  const isAllChecked = (choices.filter(choice => (choice.selected)).length === choices.length);
  console.log(isAllChecked);

  let checkBoxes = choices.map((choice, index) => (
    <EffektCheck
      key={index}
      label={choice.label}
      checked={choice.selected}
      azure={azureColor}
      onChange={(now_checked) => {
        let activeChoices = choices.filter(choice1 => (choice1.selected) && (choice1 != choice) ).map(choice => choice.value);
        if (now_checked){
          activeChoices.push(choice.value);
        }
        onChange(activeChoices);
      }}
    ></EffektCheck>
  ));
  return <EffektCheckFormWrapper>
    <SelectAllButton onClick={() => {isAllChecked ? onChange(new Array<number>()) : onChange(choices.map(choice => choice.value))}}>Select all</SelectAllButton>
    {checkBoxes}
  </EffektCheckFormWrapper>;
};