import styled from "styled-components";
import React from "react";
import { createPortal } from "react-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
`;

const Content = styled.div`
  background: #fff;
  border-radius: 0px;
  padding: 26px;
  max-height: 90vh;
  overflow: auto;
`;

interface IProps {
  visible: boolean;
  children: React.ReactNode;
  className?: string;
  onClickAway?: () => void;
  effect?: string;
}

export const EffektModal: React.FC<IProps> = ({ visible, children, className, onClickAway }) => {
  if (!visible || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <Overlay onMouseDown={() => onClickAway?.()}>
      <Content
        className={className}
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {children}
      </Content>
    </Overlay>,
    document.body,
  );
};
