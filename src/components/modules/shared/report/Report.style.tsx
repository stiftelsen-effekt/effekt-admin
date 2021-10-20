import styled from 'styled-components';

export const ReportWrapper = styled.div`
  border-left: 4px solid #006a82;
  display: flex;
  flex-direction: column;

  table {
    td:nth-child(2) {
      text-align: right;
    }
  }
`;

export const ReportHeader = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
  background: #e7f2f4;
  position: relative;
  padding: 15px 20px;
  font-family: 'Georgia';
  font-weight: 400;
`;

export const ReportContent = styled.div`
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 100%;
`;
