import { useEffect } from "react";
import { ColumnDef, Row, SortingState } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { fetchAvtaleGiroValidationTableAction } from "../../../../store/avtalegiro/avtalegiro.actions";
import { ReportContent, ReportHeader, ReportWrapper } from "../../shared/report/Report.style";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import { useAuth0 } from "@auth0/auth0-react";
import { EffektTable } from "../../../style/elements/react-table/EffektTable";

export const AvtaleGiroValidationTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const avtaleGiroState = useSelector((state: AppState) => state.avtaleGiroAgreements);

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAvtaleGiroValidationTableAction.started({ token })),
    );
  }, [dispatch, getAccessTokenSilently]);

  const thousandize = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const data = avtaleGiroState.validation.validationTable;
  type ValidationRow = (typeof data)[number];

  const columnDefinitions: ColumnDef<ValidationRow>[] = [
    {
      header: "Date",
      accessorKey: "date",
      id: "date",
      size: 60,
    },
    {
      header: "Expected",
      accessorKey: "expected",
      id: "expected",
      cell: ({ getValue }) => thousandize(getValue<number>()) + " kr",
    },
    {
      header: "Actual",
      accessorKey: "actual",
      id: "actual",
      cell: ({ getValue }) => {
        const value = getValue<number | null>();
        return value !== null ? thousandize(value) + " kr" : "-";
      },
    },
    {
      header: "Diff",
      accessorKey: "diff",
      id: "diff",
      cell: ({ row }) =>
        row.original.actual !== null ? thousandize(row.original.diff) + " kr" : "-",
    },
  ];

  const defaultSorting: SortingState = [{ id: "date", desc: true }];

  const getRowProps = (row: Row<ValidationRow>) => ({
    onDoubleClick: () => {
      const now = DateTime.fromJSDate(new Date());
      const date =
        now.day < row.original.date
          ? now.set({ day: row.original.date }).minus({ months: 1 }).toISO()
          : now.set({ day: row.original.date }).toISO();
      navigate(`/avtalegiro/validation/${date}`);
    },
  });

  return (
    <ReportWrapper>
      <ReportHeader>AvtaleGiro validation</ReportHeader>
      <ReportContent>
        <EffektTable
          data={data}
          columns={columnDefinitions}
          defaultPageSize={10}
          initialSorting={defaultSorting}
          showPageSizeOptions={false}
          loading={avtaleGiroState.loading}
          getRowProps={getRowProps}
        />
      </ReportContent>
    </ReportWrapper>
  );
};
