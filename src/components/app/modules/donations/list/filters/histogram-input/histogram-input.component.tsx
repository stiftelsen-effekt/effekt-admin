import React, { useMemo } from 'react'

import Histoslider from '../../../../../../../custom_modules/histoslider/src/components/Histoslider'
import { azure50 } from '../../../../../style/colors';

import rightArrow from '../../../../../../../assets/right-arrow.svg'
import { FilterInput } from '../filters.component.style';
import { IHistogramBucket } from '../../../../../../../models/types';

interface IProps {
    range: Array<number>;
    onChange([from, to]: Array<number>): void;
}

interface IProps {
    histogram: Array<IHistogramBucket>
}
export const HistogramInputComponent: React.FunctionComponent<IProps> = ({histogram, range, onChange}) => {
    const buckets = histogram.map(histogram => histogram.bucket)
    const histogramData = useMemo(() => histogram.map((bucket, index) => ({
        x0: index,
        x: index+1,
        y: histogram[index].bar
    })),[histogram]);

    const closestIndex = (input: Array<number>, goal: number) => {
        var curr = input[0];
        var diff = Math.abs (goal - curr);
        for (var val = 0; val < input.length; val++) {
            var newdiff = Math.abs (goal - input[val]);
            if (newdiff < diff) {
                diff = newdiff;
                curr = val;
            }
        }
        return curr;
    }

    const sliderIndex = [closestIndex(buckets, range[0]), closestIndex(buckets, range[1])]
      
    return (
        <div>
            <Histoslider
                data={
                    histogramData
                }
                selection={sliderIndex}
                onChange={([bottom, top]: Array<number>) => {
                    bottom = parseInt(bottom.toString())
                    top = parseInt(top.toString())

                    onChange([buckets[bottom], buckets[top]])
                }}
                width={260}
                height={120}
                step={1}
                padding={10}
                selectedColor={azure50}
                histogramStyle={
                    {
                        backgroundColor: "none"
                    }
                }
                showLabels={false}><span>Cool</span>
            </Histoslider>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <FilterInput 
                    type="number" 
                    value={range[0]}
                    style={{width: 80}}
                    onChange={(e) => {
                        onChange([parseInt(e.target.value), range[1]])
                    }}></FilterInput>
                <img src={rightArrow} style={{height: '20px'}} alt="arrow" />
                <FilterInput 
                    type="number" 
                    value={range[1]} 
                    style={{width: 80}}
                    onChange={(e) => {
                        onChange([range[0], parseInt(e.target.value)])
                    }}></FilterInput>
            </div>
        </div>
    )
}
