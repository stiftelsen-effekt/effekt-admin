import styled from "styled-components";

export const TotalDonationAmountWrapper = styled.div`
  width: 350px;
  backgrund: #ccc;

  table {
    td {
      width: 70%;
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
