import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, List, ToggleLeft, ToggleRight } from "react-feather";
import { ICauseArea } from "../../../../models/types";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektTable } from "../../../style/elements/react-table/EffektTable";
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
  const columns: ColumnDef<ICauseArea>[] = [
    {
      header: "ID",
      accessorKey: "id",
      size: 60,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Order",
      accessorKey: "ordering",
      size: 80,
    },
    {
      header: "Standard",
      accessorKey: "standardPercentageShare",
      size: 100,
      cell: ({ getValue }) => {
        const value = getValue<ICauseArea["standardPercentageShare"]>();
        return value ? `${value.toNumber()}%` : "0%";
      },
    },
    {
      header: "Status",
      accessorKey: "isActive",
      size: 100,
      cell: ({ getValue }) => (
        <StatusBadge active={Boolean(getValue<boolean>())}>
          {getValue<boolean>() ? "Active" : "Inactive"}
        </StatusBadge>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      size: 400,
      enableSorting: false,
      cell: ({ row }) => (
        <TableActionsWrapper>
          <EffektButton onClick={() => onEdit(row.original)}>
            <Edit size={18} />
          </EffektButton>
          <EffektButton onClick={() => onToggleActive(row.original.id)}>
            {row.original.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </EffektButton>
          <EffektButton
            onClick={() => onManageOrganizations(row.original.id)}
            style={{ width: 160 }}
          >
            <List size={18} style={{ marginRight: "5px" }} />{" "}
            {`Orgs (${row.original.organizations?.length || 0})`}
          </EffektButton>
        </TableActionsWrapper>
      ),
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
      <EffektTable columns={columns} data={causeAreas} defaultPageSize={25} />
    </TableWrapper>
  );
};

export default CauseAreasList;
