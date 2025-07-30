import React from "react";
import ReactTable from "react-table";
import { Edit, ToggleLeft, ToggleRight } from "react-feather";
import { IOrganization } from "../../../../models/types";
import { EffektButton } from "../../../style/elements/button.style";
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
      Header: "Abbreviation",
      accessor: "abbreviation",
      width: 120,
    },
    {
      Header: "Order",
      accessor: "ordering",
      width: 80,
    },
    {
      Header: "Standard",
      accessor: "standardShare",
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
      width: 200,
      Cell: ({ row }: { row: { _original: IOrganization } }) => {
        if (!row || !row._original) return null;
        return (
          <TableActionsWrapper>
            <EffektButton onClick={() => onEdit(row._original)}>
              <Edit size={18} />
            </EffektButton>
            <EffektButton onClick={() => onToggleActive(row._original.id)}>
              {row._original.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
            </EffektButton>
          </TableActionsWrapper>
        );
      },
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
      <ReactTable
        data={filteredOrganizations}
        columns={columns}
        defaultPageSize={25}
        loading={false}
      />
    </TableWrapper>
  );
};

export default OrganizationsList;
