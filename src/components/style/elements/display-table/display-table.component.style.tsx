import styled from "styled-components";
import { grey15 } from "../../colors";

export const EffektDisplayTable = styled.table`
  border-spacing: 0px;
  border-collapse: separate;
  width: 100%;
  max-width: 1024px;

  thead {
    tr {
      th {
        padding: 12px;
        font-weight: 600;
        color: black;
        border-bottom: 1px solid ${grey15};
        text-align: left;
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 12px;
      }
    }
  }
`;
