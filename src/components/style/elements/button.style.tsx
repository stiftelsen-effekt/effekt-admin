import styled from "styled-components";

interface ButtonProps {
  inverted?: boolean;
}
export const EffektButton = styled.button<ButtonProps>`
  padding: 10px 30px;
  font-family: "ESKlarheitGrotesk";
  display: inline-flex;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.2);
  background: ${(props) => (props.inverted ? "white" : "black")};
  color: ${(props) => (props.inverted ? "black" : "white")};

  svg {
    vertical-align: middle;
    margin-right: 6px;
  }

  span {
    vertical-align: middle;
    text-decoration: none;
  }

  &:disabled {
    opacity: 0.5;
    &:hover {
      cursor: auto;
    }
  }
`;

export const EffektSecondaryButton = styled(EffektButton)`
  background: #444;
  color: white;
`;
