import styled from 'styled-components'

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
  border-bottom: ${((props: ITabHeaderProps) => props.selected ? '3px solid #555' : 'none')};
  line-height: 26px;
  font-weight: 500;
  color: rgb(54 59 69);
`;

export const TabHeaderCounter = styled.div`\
  display: flex;
  justify-content: center;
  align-items: center;
  background: #7e8ba2;
  width: 26px;
  height: 26px;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  margin-left: 12px;
  font-weight: normal;
`;