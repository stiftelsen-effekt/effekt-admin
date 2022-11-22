import React from 'react';
import { EffektButton } from '../../style/elements/button.style';
import { EffektDatePicker } from '../../style/elements/datepicker/datepicker.style';
import { ArrowRight } from 'react-feather';
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
  const floor = (date: Date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };
  const ceil = (date: Date) => {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date;
  };
  const now = new Date();
  const presets = {
    '7 days': [
      new Date(new Date(now).setDate(now.getDate() - 6)),
      now,
    ],
    '30 days': [
      new Date(new Date(now).setDate(now.getDate() - 29)),
      now,
    ],
    'This month': [
      new Date(new Date(now).setDate(1)),
      new Date(now.getFullYear(), now.getMonth() + 1, 0),
    ],
    'Last month': [
      new Date(now.getFullYear(), now.getMonth() - 1, 1),
      new Date(now.getFullYear(), now.getMonth(), 0),
    ],
    'This year': [
      new Date(now.getFullYear(), 0, 1),
      new Date(now.getFullYear(), 12, 0),
    ],
    'Last year': [
      new Date(now.getFullYear() - 1, 0, 1),
      new Date(now.getFullYear() - 1, 12, 0),
    ],
  };
  return (
    <React.Fragment>
      <DatesContainer>
        <EffektDatePicker
          onChange={(data) => {
            onChangeFrom(data ? floor(data) : null)
          }}
          selected={from}
          placeholderText="from"
          dateFormat="dd.MM.yyyy"
        ></EffektDatePicker>
        <ArrowRight
          color={inverted ? 'white' : 'black'}
          style={{ margin: '5px' }}
          />
        <EffektDatePicker
          onChange={(data) => {
            onChangeTo(data ? ceil(data) : null)
          }}
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
                from = data[0] ? floor(data[0]) : null;
                to = data[1] ? ceil(data[1]) : null;
                onChangeRange(from, to);
              }
            }}
          >{label}</EffektButton>
        ))}
      </RangeContainer>
    </React.Fragment>
  );
};
