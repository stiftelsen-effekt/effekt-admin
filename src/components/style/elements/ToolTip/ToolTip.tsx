/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";
import { ToolTipIcon } from "./ToolTipIcon";

const ToolTipWrapper = styled.div`
  position: relative;
  display: inline;
  z-index: 2;
`;

const ToolTipText = styled.span`
  font-size: 14px;
  background-color: white;
  margin-left: 5px;
  bottom: 25px;
  height: auto;
  width: 230px;
  padding: 10px;
  position: absolute;
  display: none;
  white-space: pre-wrap;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 5;
`;

interface ToolTipProps {
  text?: string;
  textMarginLeft?: string;
  textMarginTop?: string;
  marginLeft?: string;
  marginTop?: string;
}

export const ToolTip: React.FC<ToolTipProps> = (props) => {
  return (
    <ToolTipWrapper
      style={{ marginLeft: props.marginLeft, marginTop: props.marginTop }}
    >
      <ToolTipIcon />
      <ToolTipText
        style={{
          marginLeft: props.textMarginLeft,
          marginTop: props.textMarginTop,
        }}
      >
        {props.text}
      </ToolTipText>
    </ToolTipWrapper>
  );
};
