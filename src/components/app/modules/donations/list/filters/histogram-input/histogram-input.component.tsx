import React, { useState, useMemo } from 'react'

import Histoslider from '../../../../../../../custom_modules/histoslider/src/components/Histoslider'
import { azure50 } from '../../../../../style/colors';

import rightArrow from '../../../../../../../assets/right-arrow.svg'
import { FilterInput } from '../filters.component.style';

interface IProps {
    range: Array<number>;
    onChange([from, to]: Array<number>): void;
}

export const HistogramInputComponent: React.FunctionComponent<IProps> = ({range, onChange}) => {
    const bars = [552,641,525,442,318,417,256,179,208,179,318,69,69,69,0,220,0,0,0,161,69,69,0,0,0,0,0,0,0,0,0,0,69,195,0,0,0,0,0,0,0,0]
    const buckets = [0,100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1800,1900,2000,2200,2300,2500,2700,3000,3300,3400,3500,3600,3800,4000,4400,4500,5000,7100,8000,8300,9000,10000,20000,21600,30000]
    const histogram = useMemo(() => new Array(42).fill(1).map((element, index) => ({
        x0: index,
        x: index+1,
        y: bars[index]
    })),[bars])

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
                    histogram
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
                handleLabelFormat={" "}
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
