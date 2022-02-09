import styled from 'styled-components';
import { grey15, grey70, grey30 } from '../../colors';

export const KeyInfoWrapper = styled.div`
  margin-left: 80px;
`;

export const KeyInfoGroup = styled.div`
  padding: 8px 18px;
  border-left: 1px solid ${grey15};
  margin-bottom: 18px;
`;

export const KeyInfoHeader = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${grey70};
  margin-bottom: 8px;
  margin-top: 4px;
  text-transform: uppercase;
`;

export const KeyInfoSum = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: 'black';
`;

export const KeyInfoTransactionCost = styled.span`
  font-weight: 300;
  font-size: 14px;
  color: ${grey30};
`;

export const KeyInfoValue = styled.span`
  display: inline-block;
  font-weight: 600;
  font-size: 14px;
  color: 'black';
`;

export const KeyInfoTimestamp = styled(KeyInfoValue)``;
