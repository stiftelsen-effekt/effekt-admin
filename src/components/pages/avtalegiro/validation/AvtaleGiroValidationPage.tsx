import React, { useEffect } from 'react';
import { Page } from '../../../style/elements/page.style';
import { MainHeader, SubHeader } from '../../../style/elements/headers.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { AvtaleGiroList } from '../../../modules/avtalegiro/agreementlist/AvtaleGiroList';
import { useHistory, useParams } from 'react-router';
import { fetchAvtaleGiroMissingByDateAction, fetchAvtaleGiroRecievedByDateAction } from '../../../../store/avtalegiro/avtalegiro.actions';
import { DateTime } from 'luxon'
import { DonationsList } from '../../../modules/donations/list/DonationsList';
import { EffektDatePicker } from '../../../style/elements/datepicker/datepicker.style';

export const AvtaleGiroValidationPage: React.FunctionComponent = () => {
  const params = useParams<{ date?: string }>()
  const history = useHistory()
  const dispatch = useDispatch()

  const missing = useSelector((state: AppState) => state.avtaleGiroAgreements.validation.missing)
  const recieved = useSelector((state: AppState) => state.avtaleGiroAgreements.validation.recieved)

  useEffect(() => {
    if (params.date) {
      const query = DateTime.fromISO(params.date, { zone: 'Europe/Oslo' }) 
      dispatch(fetchAvtaleGiroMissingByDateAction.started({ date: query }))
      dispatch(fetchAvtaleGiroRecievedByDateAction.started({ date: query }))
    }
  }, [dispatch, params])

  let parsedDate: DateTime | null = null
  if (params.date) {
    parsedDate = DateTime.fromISO(params.date, { zone: 'Europe/Oslo' }) 
  }

  if (parsedDate) {
    return (
      <Page>
        <MainHeader>AvtaleGiro validation | {parsedDate.setLocale('no-NB').toLocaleString()}</MainHeader>
        <EffektDatePicker 
          selected={parsedDate.toJSDate()} 
          onChange={(date) => {
            if (date) {
              history.push(`/avtalegiro/validation/${DateTime.fromJSDate(date).toISO()}`)
            }
          }}
          dateFormat="dd.MM.yyyy"
          />
        <SubHeader>Missing</SubHeader>
        <AvtaleGiroList agreements={missing} defaultPageSize={5} ></AvtaleGiroList>
        <SubHeader>Recieved</SubHeader>
        <DonationsList donations={recieved} defaultPageSize={10}></DonationsList>
      </Page>
    ); 
  } else {
    return (
      <Page>
        <span>Loading...</span>
      </Page>
    );
  }
};
