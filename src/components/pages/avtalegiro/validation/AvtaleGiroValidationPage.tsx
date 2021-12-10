import React, { useEffect } from 'react';
import { Page } from '../../../style/elements/page.style';
import { MainHeader, SubHeader } from '../../../style/elements/headers.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { AvtaleGiroList } from '../../../modules/avtalegiro/agreementlist/AvtaleGiroList';
import { useParams } from 'react-router';
import { fetchAvtaleGiroMissingByDateAction } from '../../../../store/avtalegiro/avtalegiro.actions';
import { DateTime } from 'luxon'

export const AvtaleGiroValidationPage: React.FunctionComponent = () => {
  const params = useParams<{ date?: string }>()
  const dispatch = useDispatch()
  const missing = useSelector((state: AppState) => state.avtaleGiroAgreements.validation.missing)

  useEffect(() => {
    if (params.date) {
      dispatch(fetchAvtaleGiroMissingByDateAction.started({ date: DateTime.fromISO(params.date, { zone: 'Europe/Oslo' }) }))
    }
  }, [dispatch, params])

  return (
    <Page>
      <MainHeader>AvtaleGiro validation</MainHeader>
      <SubHeader>Missing for date</SubHeader>
      <AvtaleGiroList agreements={missing} defaultPageSize={5} ></AvtaleGiroList>
    </Page>
  );
};
