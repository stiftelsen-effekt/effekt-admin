import styled from 'styled-components';
import { grey15 } from '../../style/colors';

export const KIDWrapper = styled.div`
  width: 740px;
`;

let bracketHeight = '10px';
export const KIDUpperBracket = styled.div`
  height: ${bracketHeight};
  border-top: 1px solid ${grey15};
  border-left: 1px solid ${grey15};
  border-right: 1px solid ${grey15};
`;

export const KIDLowerBracket = styled.div`
  height: ${bracketHeight};
  border-bottom: 1px solid ${grey15};
  border-left: 1px solid ${grey15};
  border-right: 1px solid ${grey15};
`;

export const KIDInnerContent = styled.div`
  padding: 12px 18px;
`;
