import styled from 'styled-components';
import { azure50 } from '../../colors';

export const FilterOpenButtonContainer = styled.div`
  background: ${azure50};
  padding: 8px 20px;
  cursor: pointer;
  position: absolute;
  top: 38px;
  left: -40px;
  transform: translateX(-100%);
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 13px;
  font-weight: 500;

  span {
    vertical-align: middle;
    margin-right: 10px;
    font-family: 'Roboto';
  }

  svg {
    vertical-align: middle;
  }

  @media (min-width: 1680px) {
    display: none;
  }
`;
