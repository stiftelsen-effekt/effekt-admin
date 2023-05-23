import React from "react";
import { FilterOpenButtonContainer } from "./filter-open-button.component.style";
import { Filter, X } from "react-feather";

interface IProps {
  isOpen: boolean;
  onClick: React.EventHandler<React.MouseEvent>;
}
export const FilterOpenButton: React.FunctionComponent<IProps> = ({ onClick, isOpen }) => {
  return (
    <FilterOpenButtonContainer onClick={onClick}>
      {!isOpen ? (
        <React.Fragment>
          <span>Filter</span>
          <Filter color={"white"} size={20}></Filter>
        </React.Fragment>
      ) : (
        <X color={"white"} size={20}></X>
      )}
    </FilterOpenButtonContainer>
  );
};
