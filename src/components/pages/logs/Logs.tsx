import React, { useEffect } from "react";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { LogsList } from "../../modules/logs/list/LogsList";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { setLogsPaginationAction } from "../../../store/logs/logs-list.actions";
import { LogsFilter } from "../../modules/logs/list/filters/LogsFilter";
import { LogsListWrapper } from "../../modules/logs/list/LogsList.style";

export const LogsPageComponent: React.FunctionComponent = (props) => {
  const dispatch = useDispatch();

  const pagination = useSelector((state: AppState) => state.logs.pagination);
  useEffect(() => {
    dispatch(setLogsPaginationAction({ ...pagination, limit: 20 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Page>
      <MainHeader>Import logs</MainHeader>
      <LogsFilter></LogsFilter>
      <LogsListWrapper>
        <LogsList></LogsList>
      </LogsListWrapper>
    </Page>
  );
};
