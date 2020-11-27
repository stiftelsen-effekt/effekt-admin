import React from 'react';
import { Filter, X } from 'react-feather';
import { FilterOpenButtonContainer } from './filter-open-button.component.style';

interface IProps {
  isOpen: boolean;
  onClick: React.EventHandler<React.MouseEvent>;
}
export const FilterOpenButton: React.FunctionComponent<IProps> = ({
  onClick,
  isOpen,
}) => {
  return (
    <FilterOpenButtonContainer onClick={onClick}>
      {!isOpen ? (
        <>
          <span>Filter</span>
          <Filter color="white" size={20} />
        </>
      ) : (
        <X color="white" size={20} />
      )}
    </FilterOpenButtonContainer>
  );
};
