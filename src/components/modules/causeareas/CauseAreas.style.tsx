import styled from "styled-components";

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90vw;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 20px 0;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #333;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const TableActionsWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
`;

export const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => (props.active ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.active ? "#155724" : "#721c24")};
`;

export const PageActionsWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const LoadingWrapper = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

export const TableWrapper = styled.div`
  .rt-table {
    border: 1px solid #eee;
  }
`;

export const WarningWrapper = styled.div`
  background: #a30909ff;
  color: #ffffffff;
  border-radius: 8px;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;
