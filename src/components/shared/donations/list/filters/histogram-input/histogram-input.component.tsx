import React, { useMemo } from 'react';

import Histoslider from 'histoslider';
import { azure50 } from '../../../../../../config/colors';

import rightArrow from '../../../../../../assets/right-arrow.svg';
import { FilterInput } from '../../../../elements/filters.component.style';
import { Histogram, IHistogramBucket } from '../../../../../../types';

interface IProps {
  range: Array<number>;
  onChange([from, to]: Array<number>): void;
}

interface IProps {
  histogram: Histogram;
}
export const HistogramInputComponent: React.FunctionComponent<IProps> = ({
  histogram,
  range,
  onChange,
}) => {
  const buckets = histogram.map((bucket: IHistogramBucket) => bucket.bucket);
  buckets.push(Number.MAX_SAFE_INTEGER); // Upper bound
  const histogramData = useMemo(
    () =>
      histogram.map((bucket, index) => ({
        x0: index,
        x: index + 1,
        y: histogram[index].bar,
      })),
    [histogram],
  );

  const closestIndex = (input: Array<number>, goal: number) => {
    let curr = input[0];
    let diff = Math.abs(goal - curr);
    for (let val = 0; val < input.length; val++) {
      const newdiff = Math.abs(goal - input[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = val;
      }
    }
    return curr;
  };

  const sliderIndex: [number, number] = [
    closestIndex(buckets, range[0]),
    closestIndex(buckets, range[1]),
  ];

  return (
    <div>
      <Histoslider
        data={histogramData}
        selection={sliderIndex}
        onChange={([bottom, top]: Array<number>) => {
          bottom = parseInt(bottom.toString(), 10);
          top = parseInt(top.toString(), 10);

          onChange([buckets[bottom], buckets[top]]);
        }}
        width={260}
        height={120}
        step={1}
        padding={10}
        selectedColor={azure50}
        histogramStyle={{
          backgroundColor: 'none',
        }}
        showLabels={false}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <FilterInput
            value={range[0]}
            style={{ width: 80 }}
            onChange={(e) => {
              try {
                const parsed: number = parseInt(e.target.value, 10);
                onChange([parsed, range[1]]);
              } catch (ex) {
                console.error(ex);
              }
            }}
          />
          <span>&nbsp;&nbsp;kr</span>
        </div>
        <img src={rightArrow} style={{ height: '20px' }} alt="arrow" />
        <div>
          <FilterInput
            value={range[1] === Number.MAX_SAFE_INTEGER ? '∞' : range[1]}
            style={{ width: 80 }}
            onChange={(e) => {
              try {
                const parsed: number = parseInt(e.target.value, 10);
                onChange([range[0], parsed]);
              } catch (ex) {
                console.error(ex);
              }
            }}
          />
          <span>&nbsp;&nbsp;kr</span>
        </div>
      </div>
    </div>
  );
};
