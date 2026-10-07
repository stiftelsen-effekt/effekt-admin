import React, { useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { thousandize, longDateTime } from "../../../../util/formatting";
import { ITaxUnit } from "../../../../models/types";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { TaxUnitModal } from "../modal/TaxUnitModal";
import { Edit, Plus } from "react-feather";
import { EffektButton } from "../../../style/elements/button.style";
import { NewTaxUnitModal } from "../modal/NewTaxUnitModal";
import { EffektTable } from "../../../style/elements/react-table/EffektTable";

interface Props {
  taxUnits: Array<ITaxUnit> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
  donorId: number;
}

export const TaxUnitList: React.FunctionComponent<Props> = ({
  taxUnits,
  manual,
  defaultPageSize,
  donorId,
}) => {
  const loading = useSelector((state: AppState) => state.taxUnits.loading);

  const [editTaxunit, setEditTaxunit] = useState<ITaxUnit | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const columnDefinitions: ColumnDef<ITaxUnit>[] = [
    {
      header: "ID",
      accessorKey: "id",
      size: 100,
    },
    {
      header: "SSN",
      accessorKey: "ssn",
      size: 170,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Donations",
      id: "donations",
      accessorFn: (taxUnit) => taxUnit.numDonations,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>{thousandize(getValue<number>())}</span>
      ),
      size: 170,
    },
    {
      header: "Sum donations",
      id: "sumdonations",
      accessorFn: (taxUnit) => taxUnit.sumDonations,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>
          {thousandize(getValue<number>())} kr
        </span>
      ),
      size: 170,
    },
    {
      header: "Registered",
      id: "registered",
      accessorFn: (taxUnit) => taxUnit.registered,
      cell: ({ getValue }) => longDateTime(getValue<ITaxUnit["registered"]>()),
      size: 140,
    },
    {
      header: "Edit",
      id: "edit",
      accessorFn: (taxUnit) => taxUnit,
      enableSorting: false,
      cell: ({ row }) => (
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}
        >
          <button onClick={() => setEditTaxunit(row.original)} type="button">
            <Edit size={14} />
          </button>
        </div>
      ),
      size: 100,
    },
  ];

  const defaultSorting: SortingState = [{ id: "registered", desc: true }];

  const table = (
    <EffektTable
      data={taxUnits}
      defaultPageSize={defaultPageSize}
      loading={manual ? loading || !taxUnits : loading}
      columns={columnDefinitions}
      initialSorting={defaultSorting}
    />
  );

  if (manual) {
    return (
      <div>
        {table}
        <EffektModal
          visible={editTaxunit !== null}
          effect="fadeInUp"
          onClickAway={() => setEditTaxunit(null)}
        >
          {editTaxunit && (
            <TaxUnitModal
              taxUnit={editTaxunit}
              donorId={donorId}
              onSubmit={() => setEditTaxunit(null)}
            />
          )}
        </EffektModal>
        <EffektModal
          visible={showAddModal}
          effect="fadeInUp"
          onClickAway={() => setShowAddModal(false)}
        >
          <NewTaxUnitModal donorId={donorId} onSubmit={() => setShowAddModal(false)} />
        </EffektModal>
      </div>
    );
  }

  return (
    <div>
      <EffektButton onClick={() => setShowAddModal(true)}>
        Add tax unit <Plus size={16} />
      </EffektButton>
      {table}
      <EffektModal
        visible={editTaxunit !== null}
        effect="fadeInUp"
        onClickAway={() => setEditTaxunit(null)}
      >
        {editTaxunit && (
          <TaxUnitModal
            taxUnit={editTaxunit}
            donorId={donorId}
            onSubmit={() => setEditTaxunit(null)}
          />
        )}
      </EffektModal>
      <EffektModal
        visible={showAddModal}
        effect="fadeInUp"
        onClickAway={() => setShowAddModal(false)}
      >
        <NewTaxUnitModal donorId={donorId} onSubmit={() => setShowAddModal(false)} />
      </EffektModal>
    </div>
  );
};
