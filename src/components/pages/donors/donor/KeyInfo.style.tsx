import styled from 'styled-components';

export const DonorKeyInfoWrapper = styled.div`
  width: 420px;
  backgrund: #ccc;

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