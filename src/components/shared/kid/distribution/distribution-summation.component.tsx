import React from 'react';
import Decimal from 'decimal.js';
import check from '../../../../assets/checked.png';
import exclamation from '../../../../assets/exclamation-mark.png';
import {
  Invalid,
  Valid,
  SummationString,
} from './distribution-summation.style.component';

interface IProps {
  max: Decimal;
  current: Decimal;
}

export const SummationComponent: React.FunctionComponent<IProps> = (
  props: IProps,
) => {
  const valid = props.current.equals(props.max);

  const summation = (
    <SummationString>
      Sum:
      {`${props.current.toString()} / ${props.max.toString()}`}
    </SummationString>
  );

  if (valid) {
    return (
      <Valid>
        <img src={check} alt="Valid" style={{ verticalAlign: 'middle' }} />
        {summation}
      </Valid>
    );
  }
  return (
    <Invalid>
      <img
        src={exclamation}
        alt="Invalid"
        style={{ verticalAlign: 'middle' }}
      />
      {summation}
    </Invalid>
  );
};
