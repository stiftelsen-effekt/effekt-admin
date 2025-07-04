import styled from "styled-components";

export const ModalContent = styled.div`
  padding: 20px;
  width: 400px;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 20px 0;
`;

export const FormGroup = styled.div`
  margin-top: 20px;

  &:first-of-type {
    margin-top: 0;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }
`;

export const ModalFooter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const TableActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StatusBadge = styled.span<{ active: boolean }>`
  color: ${(props) => (props.active ? "#28a745" : "#dc3545")};
  font-weight: 500;
`;

export const PageActionsWrapper = styled.div`
  margin-bottom: 20px;
`;

export const InfoSection = styled.details`
  margin-bottom: 20px;

  summary {
    cursor: pointer;
    font-weight: bold;
    padding: 10px 0;
  }

  p {
    margin-top: 10px;
    line-height: 1.6;
  }
`;

export const LoadingWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

export const TableWrapper = styled.div`
  margin-top: 20px;
`;
