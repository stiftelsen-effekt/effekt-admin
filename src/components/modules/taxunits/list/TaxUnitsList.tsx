import React, { useEffect, useState } from "react";
import ReactTable from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { thousandize, longDateTime } from "../../../../util/formatting";
import { DateTime } from "luxon";
import { ITaxUnit } from "../../../../models/types";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { TaxUnitModal } from "../modal/TaxUnitModal";
import { Edit, Plus } from "react-feather";
import { EffektButton } from "../../../style/elements/button.style";
import { NewTaxUnitModal } from "../modal/NewTaxUnitModal";

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
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const pages = useSelector((state: AppState) => state.taxUnits.pages);
  const loading = useSelector((state: AppState) => state.taxUnits.loading);
  const pagination = useSelector((state: AppState) => state.taxUnits.pagination);

  const [editTaxunit, setEditTaxunit] = useState<ITaxUnit | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  useEffect(() => {
    if (manual) {
      // TODO: Implement
      // getAccessTokenSilently().then((token) => dispatch(fetchDonationsAction.started({ token })));
    }
  }, [pagination, manual, dispatch, getAccessTokenSilently]);

  const columnDefinitions: any[] = [
    {
      Header: "ID",
      accessor: "id",
      width: 100,
    },
    {
      Header: "SSN",
      accessor: "ssn",
      width: 170,
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Donations",
      id: "donations",
      accessor: (res: ITaxUnit) => thousandize(res.numDonations),
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      width: 170,
    },
    {
      Header: "Sum donations",
      id: "sumdonations",
      textAlign: "right",
      accessor: (res: ITaxUnit) => thousandize(res.sumDonations) + " kr",
      Cell: (row) => <span style={{ textAlign: "right", width: "100%" }}>{row.value}</span>,
      width: 170,
    },
    {
      Header: "Registered",
      id: "registered",
      accessor: (res: any) => longDateTime(DateTime.fromISO(res.registered)),
      sortMethod: (a: any, b: any) => {
        return DateTime.fromFormat(a, "dd.MM.yyyy HH:mm") >
          DateTime.fromFormat(b, "dd.MM.yyyy HH:mm")
          ? -1
          : 1;
      },
      width: 140,
    },
    {
      Header: "Edit",
      id: "edit",
      accessor: (res: any) => (
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}
        >
          <button onClick={() => setEditTaxunit(res)}>
            <Edit size={14} />
          </button>
        </div>
      ),
      width: 100,
    },
  ];

  const defaultSorting = [{ id: "registered", desc: true }];

  const trProps = (tableState: any, rowInfo: any) => {
    if (rowInfo && rowInfo.row) {
      return {
        onDoubleClick: (e: any) => {
          alert("Not implemented");
          // history.push(`/taxunits/${rowInfo.original.id}`);
        },
      };
    }
    return {};
  };

  if (manual) {
    return (
      <div>
        <ReactTable
          manual
          data={taxUnits}
          page={pagination.page}
          pages={pages}
          pageSize={defaultPageSize ? defaultPageSize : pagination.limit}
          loading={loading || !taxUnits}
          columns={columnDefinitions}
          defaultSorted={defaultSorting}
          onPageChange={
            (page) => null // dispatch(setDonationsPagination({ ...pagination, page }))
          }
          onSortedChange={
            (sorted) => null
            // dispatch(setDonationsPagination({ ...pagination, sort: sorted[0] }))
          }
          onPageSizeChange={
            (pagesize) => null
            // dispatch(setDonationsPagination({ ...pagination, limit: pagesize }))
          }
          getTrProps={trProps}
        />
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
            ></TaxUnitModal>
          )}
        </EffektModal>
        <EffektModal
          visible={showAddModal}
          effect="fadeInUp"
          onClickAway={() => setShowAddModal(false)}
        >
          <NewTaxUnitModal
            donorId={donorId}
            onSubmit={() => setShowAddModal(false)}
          ></NewTaxUnitModal>
        </EffektModal>
      </div>
    );
  } else {
    return (
      <div>
        <EffektButton onClick={() => setShowAddModal(true)}>
          Add tax unit <Plus size={16} />
        </EffektButton>
        <ReactTable
          data={taxUnits}
          defaultPageSize={defaultPageSize}
          loading={loading}
          columns={columnDefinitions}
          defaultSorted={defaultSorting}
          getTrProps={trProps}
        />
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
            ></TaxUnitModal>
          )}
        </EffektModal>
        <EffektModal
          visible={showAddModal}
          effect="fadeInUp"
          onClickAway={() => setShowAddModal(false)}
        >
          <NewTaxUnitModal
            donorId={donorId}
            onSubmit={() => setShowAddModal(false)}
          ></NewTaxUnitModal>
        </EffektModal>
      </div>
    );
  }
};
