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
  onChange(selectedValues: Array<any>): void;
}

export const EffektCheckForm: React.FunctionComponent<IProps> = ({ choices, azure, onChange }) => {
  const azureColor: boolean = azure ? true : false;

  let checkBoxes = choices.map((choice, index) => (
    <EffektCheck
      key={index}
      label={choice.label}
      checked={choice.selected}
      azure={azureColor}
      onChange={(checked) => {
        let updatedValues: Array<any> = choices.reduce(
          (result: Array<any>, origChoice: EffektCheckChoice) => {
            if (choice.label === origChoice.label) {
              if (checked) {
                result.push(choice.value);
                return result;
              } else {
                return result;
              }
            }
            if (origChoice.selected) {
              result.push(origChoice.value);
            }
            return result;
          },
          []
        );
        onChange(updatedValues);
      }}
    ></EffektCheck>
  ));
  return <EffektCheckFormWrapper>{checkBoxes}</EffektCheckFormWrapper>;
};
