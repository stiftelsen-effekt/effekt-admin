import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { Link } from 'react-router-dom';
import { AppState, VippsAgreementsState } from '../../../models/state';
import { RightTD } from './AvtaleGiroPage.style';
import { fetchAvtaleGiroReportAction } from '../../../store/avtalegiro/avtalegiro.actions';

export const AvtaleGiroPage: React.FunctionComponent = () => {
  return (
    <Page>
      <MainHeader>AvtaleGiro</MainHeader>
    </Page>
  );
};
