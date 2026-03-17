import React from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { DateTime } from "luxon";

import { IReferralAnswer } from "../../../../models/types";
import { longDateTime } from "../../../../util/formatting";
import { EffektTable } from "../../../style/elements/react-table/EffektTable";

export const ReferralAnswerList: React.FunctionComponent<{
  data?: Array<IReferralAnswer>;
  defaultPageSize?: number;
}> = ({ data, defaultPageSize }) => {
  const columns: ColumnDef<IReferralAnswer>[] = [
    { header: "ID", size: 60, accessorKey: "id" },
    {
      header: "Answer",
      id: "answer",
      accessorFn: (answer) => answer.answer ?? "",
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return value.length ? value : "–";
      },
    },
    {
      header: "Timestamp",
      size: 150,
      id: "timestamp",
      accessorFn: (answer) => answer.timestamp,
      cell: ({ getValue }) => longDateTime(DateTime.fromISO(getValue<string>())),
    },
    { header: "Web Session", size: 150, accessorKey: "session" },
    {
      header: "Active Type",
      size: 110,
      id: "active",
      accessorFn: (answer) => answer.active,
      cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    },
  ];
  const initialSorting: SortingState = [{ id: "id", desc: true }];

  return (
    <EffektTable
      columns={columns}
      data={data ? data : []}
      defaultPageSize={defaultPageSize ? defaultPageSize : 10}
      initialSorting={initialSorting}
    />
  );
};
