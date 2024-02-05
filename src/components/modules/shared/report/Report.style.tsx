import styled from "styled-components";

export const ReportWrapper = styled.div`
  border-left: 4px solid black;
  display: flex;
  flex-direction: column;
  height: 100%;
  grid-column: ${(props: { wide?: boolean }) => (props.wide ? "1 / span 2" : "auto")};
  min-height: 500px;

  table {
    td:nth-child(2) {
      text-align: right;
    }
  }
`;

export const ReportHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
  padding: 15px 20px;
  font-family: "ESKlarheitKurrent";
  font-weight: 400;
`;

export const ReportContent = styled.div`
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;
`;

export const ReportActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  width: 100%;
`;
