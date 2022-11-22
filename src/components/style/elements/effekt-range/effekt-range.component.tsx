import React from 'react';
import { Range } from 'react-range';
import { EffektRangeWrapper, EffektTrackItem, EffektThumbItem } from './effekt-range.component.style';

const EffektNumberRange: React.FC<{
  min: number,
  max: number,
  onChange: (from: number, to: number) => void,
  step?: number,
}> = ({ min, max, onChange, step }) => {
  const [values, setValues] = React.useState([min, max]);
  step = step || 1;
  var precision = 0;
  if (step < 1)
    precision = -step.toExponential().split("e")[1];
  return (
    <EffektRangeWrapper>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={vals => {
          setValues(vals);
          onChange(vals[0], vals[1]);
        }}
        renderTrack={({ props, children }) =>
          <EffektTrackItem props={props} children={children} min={min} max={max} values={values}/>
        }
        renderThumb={({ index, props, isDragged }) =>
          <EffektThumbItem index={index} props={props} isDragged={isDragged} values={values} precision={precision} />
        }
      />
    </EffektRangeWrapper>
  );
};

export default EffektNumberRange;
