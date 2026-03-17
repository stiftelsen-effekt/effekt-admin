import React, { useEffect, useState } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import {
  setDistributionPagination,
  fetchDistributionsAction,
} from "../../../../store/distributions/distribution.actions";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../../models/state";
import { IDistributionSearchResultItem } from "../../../../models/types";
import { thousandize } from "../../../../util/formatting";
import { Plus } from "react-feather";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { CreateDistribution } from "../create/CreateDistribution";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  EffektTable,
  paginationFromApiState,
  sortingFromApiState,
  sortingToApiState,
} from "../../../style/elements/react-table/EffektTable";

type DistributionTableRow = IDistributionSearchResultItem & {
  KID?: string;
};

export const DistributionsList: React.FunctionComponent<{
  distributions: Array<DistributionTableRow> | undefined;
  manual?: boolean;
  defaultPageSize?: number;
  hideName?: boolean;
  hideEmail?: boolean;
}> = ({ distributions, manual, defaultPageSize, hideName, hideEmail }) => {
  const pages = useSelector((state: AppState) => state.distributions.pages);
  const loading = useSelector((state: AppState) => state.distributions.loading);
  const pagination = useSelector((state: AppState) => state.distributions.pagination);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [showCreate, setShowCreate] = useState<boolean>(false);

  useEffect(() => {
    if (manual) {
      getAccessTokenSilently().then((token) =>
        dispatch(fetchDistributionsAction.started({ token })),
      );
    }
  }, [manual, pagination, dispatch, getAccessTokenSilently]);

  let columnDefinitions: ColumnDef<DistributionTableRow>[] = [
    {
      header: "KID",
      id: "KID",
      accessorFn: (distribution) => distribution.KID ?? distribution.kid ?? "",
      size: 170,
    },
    {
      header: "Total sum",
      id: "sum",
      accessorFn: (distribution) => distribution.sum ?? 0,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>
          {thousandize(getValue<number>())} kr
        </span>
      ),
      size: 125,
    },
    {
      header: "Donations",
      id: "count",
      accessorFn: (distribution) => distribution.count ?? 0,
      cell: ({ getValue }) => (
        <span style={{ textAlign: "right", width: "100%" }}>{thousandize(getValue<number>())}</span>
      ),
      size: 100,
    },
  ];

  if (!hideName) {
    columnDefinitions.splice(1, 0, {
      header: "Name",
      accessorKey: "full_name",
    });
  }

  if (!hideEmail) {
    columnDefinitions.splice(2, 0, {
      header: "Email",
      accessorKey: "email",
      size: 350,
    });
  }

  const defaultSorting: SortingState = manual
    ? sortingFromApiState(pagination.sort)
    : [{ id: "KID", desc: true }];

  const getRowProps = (row: Row<DistributionTableRow>) => ({
    onDoubleClick: () => {
      navigate(`/distributions/${row.original.KID ?? row.original.kid}`);
    },
  });

  if (manual) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <EffektButton onClick={() => setShowCreate(true)}>
            <Plus
              color={"white"}
              size={18}
              style={{ verticalAlign: "middle", marginRight: "5px" }}
            />
            Add Distribution
          </EffektButton>
        </div>

        <EffektModal
          visible={showCreate}
          effect="fadeInUp"
          onClickAway={() => setShowCreate(false)}
        >
          <CreateDistribution onSubmit={() => setShowCreate(false)} />
        </EffektModal>
        <EffektTable
          data={distributions}
          manualPagination
          manualSorting
          pageCount={pages}
          pagination={paginationFromApiState(pagination)}
          loading={loading}
          columns={columnDefinitions}
          defaultPageSize={defaultPageSize}
          initialSorting={defaultSorting}
          sorting={defaultSorting}
          getRowProps={getRowProps}
          onPaginationChange={(nextPagination) =>
            dispatch(
              setDistributionPagination({
                ...pagination,
                page: nextPagination.pageIndex,
                limit: nextPagination.pageSize,
              }),
            )
          }
          onSortingChange={(nextSorting) =>
            dispatch(
              setDistributionPagination({
                ...pagination,
                sort: sortingToApiState(nextSorting, pagination.sort),
              }),
            )
          }
        />
      </div>
    );
  } else {
    return (
      <EffektTable
        data={distributions}
        columns={columnDefinitions}
        defaultPageSize={defaultPageSize}
        initialSorting={defaultSorting}
        getRowProps={getRowProps}
      />
    );
  }
};
