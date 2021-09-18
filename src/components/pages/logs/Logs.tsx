import React, { useEffect } from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { LogsList } from '../../modules/logs/list/LogsList';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../models/state';
import { setLogsPaginationAction } from '../../modules/logs/list/logs-list.actions';

export const LogsPageComponent: React.FunctionComponent = (props) => {
    const dispatch = useDispatch()

    const pagination = useSelector((state: AppState) => state.logs.pagination)
    useEffect(() => {
      dispatch(setLogsPaginationAction({ ...pagination, limit: 20 }))
    }, [dispatch])

    return (
        <Page>
            <MainHeader>Import logs</MainHeader>
            <LogsList></LogsList>
        </Page>
    )
}
