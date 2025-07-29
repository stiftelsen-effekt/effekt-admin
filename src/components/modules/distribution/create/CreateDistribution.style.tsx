import styled from "styled-components";

export const CreateDistributionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;

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
