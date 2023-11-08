import styled from "styled-components";

export const TaxUnitModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  padding: 20px;

  & > * {
    margin: 6px 0;
  }

  & > button {
    justify-content: center;

    svg {
      margin-left: 6px;
    }
  }
`;
