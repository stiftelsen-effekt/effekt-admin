import styled from "styled-components";

interface HorizontalPanelProps {
  gap?: number;
}
export const HorizontalPanel = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  gap: ${(props: HorizontalPanelProps) => `${props.gap || 0}px`};
`;
