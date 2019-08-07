import React from 'react'
import { FilterOpenButtonContainer } from './filter-open-button.component.style';
import { Filter } from 'react-feather';

interface IProps {
    onClick: React.EventHandler<React.MouseEvent>;
}
export const FilterOpenButton: React.FunctionComponent<IProps> = ({onClick}) => {
    return (
        <FilterOpenButtonContainer onClick={onClick}>
            <span>Filter</span>
            <Filter color={"white"} size={20}></Filter>
        </FilterOpenButtonContainer>
    )
}