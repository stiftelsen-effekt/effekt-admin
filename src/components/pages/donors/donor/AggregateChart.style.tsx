import styled from 'styled-components';

export const AggregateChartWrapper = styled.div`
  width: 1024px;

  table {
    td {
      width: 50%;
      padding: 8px 6px;
      margin: 0;
      border-bottom: 1px solid #eee;
    }

    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
`;
