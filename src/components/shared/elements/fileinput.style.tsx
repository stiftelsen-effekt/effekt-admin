import styled from 'styled-components';
import { grey15 } from '../../../config/colors';

export const HiddenFileInput = styled.input`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  font-family: 'Roboto';
  font-weight: 300;
  background: #eee;
  border: none;
  border-bottom: 1px solid ${grey15};
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;
