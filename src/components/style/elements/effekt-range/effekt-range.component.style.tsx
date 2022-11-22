import React, { ReactNode } from 'react';
import { getTrackBackground } from 'react-range';
import styled from 'styled-components';
import { ITrackProps, IThumbProps } from 'react-range/lib/types';

export const EffektRangeWrapper = styled.div`
  display: flex;
  justifyContent: center;
  flexWrap: wrap;
  padding: 0 9px;
`;

interface ITrackItemProps {
  props: ITrackProps;
  children: ReactNode;
  values: number[];
  min: number;
  max: number;
}
export const EffektTrackItem: React.FC<ITrackItemProps> = ({ props, children, values, min, max }) => {
  return (
    <div style={{
      ...props.style,
      height: '36px',
      display: 'flex',
      width: '100%'
    }}>
      <div
        ref={props.ref}
        style={{
          height: '5px',
          width: '100%',
          borderRadius: '4px',
          background: getTrackBackground({
            values,
            colors: ['white', 'lightgray', 'white'],
            min,
            max
          }),
          alignSelf: 'center'
        }}
      >
        {children}
      </div>
    </div>
  );
}
interface IThumbItemProps {
  index: number;
  props: IThumbProps;
  isDragged: boolean;
  values: number[];
  precision: number;
}
export const EffektThumbItem: React.FC<IThumbItemProps> = ({ index, props, isDragged, values, precision }) => {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        height: '18px',
        width: '18px',
        borderRadius: '50%',
        backgroundColor: isDragged ? 'lightgray' : 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid lightgray'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '24px',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '12px',
          padding: '2px 4px',
          borderRadius: '4px',
          backgroundColor: 'black'
        }}
      >
        {values[index].toFixed(precision)}
      </div>
    </div>
  );
}
