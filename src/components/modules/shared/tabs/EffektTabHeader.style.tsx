import styled from "styled-components";

interface ITabHeaderProps {
  selected?: boolean;
}

export const TabHeaderWrapper = styled.div`
  position: relative;
  top: 1px;
  display: flex;
  margin-right: 16px;
  padding: 8px;
  cursor: pointer;
  border-bottom: ${(props: ITabHeaderProps) => (props.selected ? "3px solid black" : "none")};
  line-height: 26px;
  font-weight: 600;
  color: black;
`;

export const TabHeaderCounter = styled.div`\
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  width: 26px;
  height: 26px;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  margin-left: 12px;
  font-weight: normal;
`;
