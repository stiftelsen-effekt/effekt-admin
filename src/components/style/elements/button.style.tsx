import styled from 'styled-components';
import { brown50, brown05, red20, azure50 } from '../colors';

export const EffektButton = styled.button`
  padding: 10px 30px;
  font-family: 'Roboto';
  display: inline-flex;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  background: ${brown50};
  color: white;

  svg {
    vertical-align: middle;
    margin-right: 6px;
  }

  span {
    vertical-align: middle;
    text-decoration: none;
  }
`;

export const EffektSecondaryButton = styled(EffektButton)`
  background: ${brown05};
  color: white;
`;

export const EffektRedButton = styled(EffektButton)`
  background: ${red20};
  color: white;
`;

export const EffektBlueButton = styled(EffektButton)`
  background: ${azure50};
  color: white;
`