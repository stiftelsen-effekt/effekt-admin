import styled from "styled-components";

export const AgreementListWrapper = styled.div`
  @media (min-width: 1680px) {
    padding-right: 320px;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  background: black;
  padding: 0 5px;
  border-radius: 3px;
  color: white;
`;

export const FilterIcon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  font-size: 10px;
  color: black;
  vertical-align: middle;

  &:after {
    content: "x";
  }
`;
