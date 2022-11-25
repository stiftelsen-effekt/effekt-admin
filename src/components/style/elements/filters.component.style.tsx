import styled from 'styled-components';
import { EffektDateRange } from '../../modules/range/DateRange';
import { EffektInput } from './input.style';

export const FilterHeader = styled.h2`
  font-family: 'ESKlarheitKurrent';
  font-size: 28px;
  padding-left: 20px;
  margin-bottom: 0px;
  padding-bottom: 20px;
  background: black;
  color: white;
  margin-top: 0;
  padding-top: 60px;
  font-weight: 300;
  letter-spacing: 1px;
`;

interface IFilterWrapperProps {
  isOpen: boolean;
}
export const FilterWrapper = styled.div<IFilterWrapperProps>`
  width: 300px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  background: black;
  box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  transition: transform 200ms;
  z-index: 10;

  @media (max-width: 1680px) {
    transform: ${(props) => (props.isOpen ? 'translateX(0px);' : 'translateX(100%)')};
  }
`;

export const FilterContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-y: overlay;
`;

export const FilterGroup = styled.div`
  border-bottom: 1px solid #333;
  padding: 25px 20px;
`;

export const FilterGroupHeader = styled.h3`
  font-size: 12px;
  margin-top: 0px;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
`;

export const FilterDateRange = styled(EffektDateRange)`
  input {
    background: white;
  }
`;

export const FilterDateRangeWrapper = styled.div`
  input {
    background-color: white;
    width: 113px;
  }
`;

export const FilterInput = styled(EffektInput)`
  background: white;
`;
