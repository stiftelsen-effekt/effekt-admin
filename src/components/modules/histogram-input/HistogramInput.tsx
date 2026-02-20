import React, { useMemo } from "react";

import Histoslider from "histoslider";

import rightArrow from "../../../assets/right-arrow.svg";
import { FilterInput } from "../../style/elements/filters.component.style";
import { IHistogramBucket } from "../../../models/types";

interface IProps {
  range: Array<number>;
  onChange([from, to]: Array<number>): void;
  histogram: Array<IHistogramBucket>;
  unit?: string;
}

export const HistogramInputComponent: React.FunctionComponent<IProps> = ({
  histogram,
  range,
  onChange,
  unit = "kr",
}) => {
  const buckets = histogram.map((histogram) => histogram.bucket);
  buckets.push(Number.MAX_SAFE_INTEGER); //Upper bound
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
    var curr = input[0];
    var diff = Math.abs(goal - curr);
    for (var val = 0; val < input.length; val++) {
      var newdiff = Math.abs(goal - input[val]);
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
      {buckets.length > 1 && (
        <Histoslider
          data={histogramData}
          selection={sliderIndex}
          onChange={([bottom, top]: Array<number>) => {
            bottom = parseInt(bottom.toString());
            top = parseInt(top.toString());

            onChange([buckets[bottom], buckets[top]]);
          }}
          width={260}
          height={120}
          step={1}
          padding={10}
          selectedColor={"white"}
          histogramStyle={{
            backgroundColor: "none",
          }}
          showLabels={false}
          barBorderRadius={0}
        ></Histoslider>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <div>
          <FilterInput
            value={range[0]}
            style={{ width: 80 }}
            onChange={(e) => {
              try {
                let parsed: number = parseInt(e.target.value);
                onChange([parsed, range[1]]);
              } catch (ex) {}
            }}
          ></FilterInput>
          {unit && <span>&nbsp;&nbsp;{unit}</span>}
        </div>
        <img src={rightArrow} style={{ height: "20px", color: "white" }} alt="arrow" />
        <div>
          <FilterInput
            value={range[1] === Number.MAX_SAFE_INTEGER ? "∞" : range[1]}
            style={{ width: 80 }}
            onChange={(e) => {
              try {
                let parsed: number = parseInt(e.target.value);
                onChange([range[0], parsed]);
              } catch (ex) {}
            }}
          ></FilterInput>
          {unit && <span>&nbsp;&nbsp;{unit}</span>}
        </div>
      </div>
    </div>
  );
};
