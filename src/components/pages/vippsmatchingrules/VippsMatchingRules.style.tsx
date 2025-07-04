import styled from "styled-components";

export const TableWrapper = styled.div`
  margin-top: 30px;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  gap: 20px;
`;

export const HeaderTitle = styled.h3`
  margin: 0;
`;

export const ExplanationSection = styled.div`
  margin-bottom: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 15px;
  flex-shrink: 1;
`;

export const ExplanationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
`;

export const ExplanationContent = styled.div<{ expanded: boolean }>`
  margin-top: ${(props) => (props.expanded ? "15px" : "0")};
  max-height: ${(props) => (props.expanded ? "500px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;

  p {
    margin: 0 0 10px 0;
    line-height: 1.6;
  }

  ul {
    margin: 10px 0;
    padding-left: 20px;
  }

  li {
    margin: 5px 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #495057;
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  color: #212529;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fee;

    svg {
      color: #dc3545;
    }
  }
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ModalContent = styled.div`
  padding: 20px;
  width: 500px;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 20px 0;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-weight: 500;
    color: #495057;
  }

  &.full-width {
    grid-column: 1 / -1;
  }
`;

export const DatePickerGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
`;

export const ModalFooter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;
