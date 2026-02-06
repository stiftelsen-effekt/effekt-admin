import React, { useEffect } from "react";
import { Page } from "../../../style/elements/page.style";
import { MainHeader, SubHeader } from "../../../style/elements/headers.style";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { AvtaleGiroList } from "../../../modules/avtalegiro/agreementlist/AvtaleGiroList";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAvtaleGiroMissingByDateAction,
  fetchAvtaleGiroRecievedByDateAction,
} from "../../../../store/avtalegiro/avtalegiro.actions";
import { DateTime } from "luxon";
import { DonationsList } from "../../../modules/donations/list/DonationsList";
import { EffektDatePicker } from "../../../style/elements/datepicker/datepicker.style";
import { useAuth0 } from "@auth0/auth0-react";

export const AvtaleGiroValidationPage: React.FunctionComponent = () => {
  const params = useParams<"date">();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const missing = useSelector((state: AppState) => state.avtaleGiroAgreements.validation.missing);
  const recieved = useSelector((state: AppState) => state.avtaleGiroAgreements.validation.recieved);

  useEffect(() => {
    if (params.date) {
      const query = DateTime.fromISO(params.date, { zone: "Europe/Oslo" });
      getAccessTokenSilently().then((token) => {
        dispatch(fetchAvtaleGiroMissingByDateAction.started({ date: query, token }));
        dispatch(fetchAvtaleGiroRecievedByDateAction.started({ date: query, token }));
      });
    }
  }, [dispatch, params, getAccessTokenSilently]);

  let parsedDate: DateTime | null = null;
  if (params.date) {
    parsedDate = DateTime.fromISO(params.date, { zone: "Europe/Oslo" });
  }

  if (parsedDate) {
    return (
      <Page>
        <MainHeader>
          AvtaleGiro validation | {parsedDate.setLocale("no-NB").toLocaleString()}
        </MainHeader>
        <EffektDatePicker
          selected={parsedDate.toJSDate()}
          onChange={(date) => {
            if (date) {
              navigate(`/avtalegiro/validation/${DateTime.fromJSDate(date).toISO()}`);
            }
          }}
          dateFormat="dd.MM.yyyy"
        />
        <SubHeader>Missing</SubHeader>
        <AvtaleGiroList agreements={missing} defaultPageSize={5}></AvtaleGiroList>
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
