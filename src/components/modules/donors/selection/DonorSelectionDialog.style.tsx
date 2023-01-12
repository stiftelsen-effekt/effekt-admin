import styled, { css } from 'styled-components';

export interface SelectorWrapperProps {
  visible: boolean;
}

export const SelectorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: none;
  z-index: 10000;

  justify-content: center;
  align-items: center;

  ${(props: SelectorWrapperProps) =>
    props.visible &&
    css`
      display: flex;
    `}
`;

export const DonorDialog = styled.div`
  background: white;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
  min-width: 880px;
  max-height: 100vh;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;
`;

export const Controls = styled.div`
  padding-top: 14px;
  display: flex;
  float: right;

  & Button {
    margin-left: 12px;
  }
`;
