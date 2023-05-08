import styled from "styled-components";

export const DonorKeyInfoWrapper = styled.div`
  width: 470px;
  backgrund: #ccc;
  position: relative;

  .invalid {
    color: red;
  }

  .updating {
    opacity: 40%;
  }

  table {
    td {
      width: 50%;
      padding: 8px 6px;
      margin: 0;
      border-bottom: 1px solid #eee;
      input {
        font-size: 16px;
        padding: 0;
        margin: -1px;
      }
      &:nth-child(2) {
        min-width: 300px;
        input:not([type="checkbox"]) {
          width: 97%;
        }
      }
      &:nth-child(4) {
        border-bottom: 0;
      }
    }

    tr:last-child {
      td {
        border-bottom: none;
      }
    }
  }
  & > div {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    svg {
      position: relative;
      top: 30%;
      width: 100%;
      height: 40%;
    }
  }
`;
