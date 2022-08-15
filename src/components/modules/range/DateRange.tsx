import React from 'react';
import { EffektButton } from '../../style/elements/button.style';
import { EffektDatePicker } from '../../style/elements/datepicker/datepicker.style';
import rightArrow from '../../../assets/right-arrow.svg';
import styled from 'styled-components';

interface IProps {
  from: Date | null;
  to: Date | null;
  onChangeFrom(date: Date | null): void;
  onChangeTo(date: Date | null): void;
  onChangeRange(from: Date | null, to: Date | null): void;
  inverted?: boolean;
}
export const DatesContainer = styled.div`
  display: flex;
`;
export const RangeContainer = styled.div`
  display: flex;
  &> button {
    padding: 3px 3px 1px 4px;
    margin: 0.2em;
    font-size: 11px;
  }
`;
export const EffektDateRange: React.FunctionComponent<IProps> = ({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onChangeRange,
  inverted
}) => {
  const presets = {
    '7 days': [
      new Date(new Date().setDate(new Date().getDate() - 6)),
      new Date(new Date()),
    ],
    '30 days': [
      new Date(new Date().setDate(new Date().getDate() - 29)),
      new Date(new Date()),
    ],
    'This month': [
      new Date(new Date().setDate(1)),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
    'Last month': [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    ],
    'This year': [
      new Date(new Date().getFullYear(), 0, 1),
      new Date(new Date().getFullYear(), 12, 0),
    ],
    'Last year': [
      new Date(new Date().getFullYear() - 1, 0, 1),
      new Date(new Date().getFullYear() - 1, 12, 0),
    ],
  };
  // TODO styled rather than inline styles...
  return (
    <React.Fragment>
      <DatesContainer>
        <EffektDatePicker
          onChange={onChangeFrom}
          selected={from}
          placeholderText="from"
          dateFormat="dd.MM.yyyy"
        ></EffektDatePicker>
        <img
          src={rightArrow}
          style={{
            margin: '0 12px',
            height: '20px',
            verticalAlign: 'middle',
            color: (inverted ? 'white' : 'black')
          }}
          alt="arrow"
        />
        <EffektDatePicker
          onChange={onChangeTo}
          selected={to}
          placeholderText="to"
          dateFormat="dd.MM.yyyy"
          popperClassName="right-aligned"
          popperPlacement="bottom-end"
        ></EffektDatePicker>
      </DatesContainer>
      <RangeContainer>
        {Object.entries(presets).map(([label, data]) => (
          <EffektButton
            inverted={inverted}
            key={label}
            type="button"
            onClick={() => {
              if (from !== data[0] || to !== data[1]) {
                from = data[0];
                to = data[1];
                onChangeRange(from, to);
              }
            }}
          >{label}</EffektButton>
        ))}
      </RangeContainer>
    </React.Fragment>
  );
};
