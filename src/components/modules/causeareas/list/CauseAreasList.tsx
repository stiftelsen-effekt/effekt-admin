import React from "react";
import ReactTable from "react-table";
import { Edit, List, ToggleLeft, ToggleRight } from "react-feather";
import { ICauseArea } from "../../../../models/types";
import { EffektButton } from "../../../style/elements/button.style";
import {
  TableActionsWrapper,
  StatusBadge,
  LoadingWrapper,
  TableWrapper,
} from "../CauseAreas.style";

interface Props {
  causeAreas: ICauseArea[] | undefined;
  onEdit: (causeArea: ICauseArea) => void;
  onToggleActive: (id: number) => void;
  onManageOrganizations: (causeAreaId: number) => void;
}

const CauseAreasList: React.FunctionComponent<Props> = ({
  causeAreas,
  onEdit,
  onToggleActive,
  onManageOrganizations,
}) => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
      width: 60,
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Order",
      accessor: "ordering",
      width: 80,
    },
    {
      Header: "Standard",
      accessor: "standardPercentageShare",
      width: 100,
      Cell: ({ value }: { value: any }) => (value ? `${value.toNumber()}%` : "0%"),
    },
    {
      Header: "Status",
      accessor: "isActive",
      width: 100,
      Cell: ({ value }: { value: boolean }) => (
        <StatusBadge active={value}>{value ? "Active" : "Inactive"}</StatusBadge>
      ),
    },
    {
      Header: "Actions",
      width: 400,
      Cell: ({ row }: { row: { _original: ICauseArea } }) => {
        if (!row || !row._original) return null;
        return (
          <TableActionsWrapper>
            <EffektButton onClick={() => onEdit(row._original)}>
              <Edit size={18} />
            </EffektButton>
            <EffektButton onClick={() => onToggleActive(row._original.id)}>
              {row._original.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            </EffektButton>
            <EffektButton
              onClick={() => onManageOrganizations(row._original.id)}
              style={{ width: 160 }}
            >
              <List size={18} style={{ marginRight: "5px" }} />{" "}
              {`Orgs (${row._original.organizations?.length || 0})`}
            </EffektButton>
          </TableActionsWrapper>
        );
      },
    },
  ];

  if (!causeAreas) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (causeAreas.length === 0) {
    return (
      <LoadingWrapper>No cause areas found. Click "Add Cause Area" to create one.</LoadingWrapper>
    );
  }

  return (
    <TableWrapper>
      <ReactTable data={causeAreas} columns={columns} defaultPageSize={25} loading={false} />
    </TableWrapper>
  );
};

export default CauseAreasList;
