import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, ToggleLeft, ToggleRight } from "react-feather";
import { IOrganization } from "../../../../models/types";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektTable } from "../../../style/elements/react-table/EffektTable";
import {
  TableActionsWrapper,
  StatusBadge,
  LoadingWrapper,
  TableWrapper,
} from "../Organizations.style";

interface Props {
  organizations: IOrganization[] | undefined;
  causeAreaId?: number;
  onEdit: (organization: IOrganization) => void;
  onToggleActive: (id: number) => void;
}

const OrganizationsList: React.FunctionComponent<Props> = ({
  organizations,
  causeAreaId,
  onEdit,
  onToggleActive,
}) => {
  const filteredOrganizations = causeAreaId
    ? organizations?.filter((org) => org.causeAreaId === causeAreaId)
    : organizations;

  const columns: ColumnDef<IOrganization>[] = [
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
      header: "Abbreviation",
      accessorKey: "abbreviation",
      size: 120,
    },
    {
      header: "Order",
      accessorKey: "ordering",
      size: 80,
    },
    {
      header: "Standard",
      accessorKey: "standardShare",
      size: 100,
      cell: ({ getValue }) => {
        const value = getValue<IOrganization["standardShare"]>();
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
      size: 200,
      enableSorting: false,
      cell: ({ row }) => (
        <TableActionsWrapper>
          <EffektButton onClick={() => onEdit(row.original)}>
            <Edit size={18} />
          </EffektButton>
          <EffektButton onClick={() => onToggleActive(row.original.id)}>
            {row.original.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </EffektButton>
        </TableActionsWrapper>
      ),
    },
  ];

  if (!organizations) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (!filteredOrganizations || filteredOrganizations.length === 0) {
    return (
      <LoadingWrapper>
        No organizations found. Click "Add Organization" to create one.
      </LoadingWrapper>
    );
  }

  return (
    <TableWrapper>
      <EffektTable columns={columns} data={filteredOrganizations} defaultPageSize={25} />
    </TableWrapper>
  );
};

export default OrganizationsList;
