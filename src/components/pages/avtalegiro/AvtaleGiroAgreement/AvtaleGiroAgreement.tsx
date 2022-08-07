/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { Page } from '../../../style/elements/page.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { IAvtaleGiro } from '../../../../models/types';
import { DistributionGraphComponent } from '../../../modules/distribution/Graph';
import {
  ResourceHeader,
  ResourceSubHeader,
  SubHeader,
} from '../../../style/elements/headers.style';
import {
  fetchAvtaleGiroAction,
  updateAvtaleGiroAmountAction,
  updateAvtaleGiroPaymentDateAction,
  updateAvtaleGiroStatusAction,
} from '../../../../store/avtalegiro/avtalegiro.actions';
import { HorizontalPanel } from '../../donations/Donation.style';
import { AvtaleGiroKeyInfo } from './AvtaleGiroKeyInfo';
import { SharesSelection } from './ShareSelection/ShareSelection';
import { useAuth0 } from '@auth0/auth0-react';

interface IParams {
  id: string;
}

export const AvtaleGiroAgreement: React.FunctionComponent<RouteComponentProps<IParams>> = ({
  match,
}: RouteComponentProps<IParams>) => {
  const avtaleGiro: IAvtaleGiro | undefined = useSelector(
    (state: AppState) => state.avtaleGiroAgreements.currentAgreement
  );
  const [editMenuVisible, setEditMenuVisible] = useState<boolean>(false);
  const [newAmount, setNewAmount] = useState<number>(avtaleGiro ? avtaleGiro.amount : 0);
  const [newPaymentDate, setNewPaymentDate] = useState<number>(
    avtaleGiro ? avtaleGiro.payment_date : 0
  );
  const [newStatus, setNewStatus] = useState<number>(0);
  const avtaleGiroID = match.params.id;
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) =>
      dispatch(fetchAvtaleGiroAction.started({ id: avtaleGiroID, token }))
    );
  }, [avtaleGiroID, dispatch, getAccessTokenSilently]);

  if (avtaleGiro) {
    let formattedStatus = avtaleGiro.active ? 'Active' : 'Inactive';
    if (avtaleGiro.cancelled) formattedStatus = 'Cancelled';

    return (
      <Page>
        <ResourceHeader hasSubHeader={true}>AvtaleGiro {avtaleGiroID}</ResourceHeader>
        <ResourceSubHeader>{avtaleGiro.full_name}</ResourceSubHeader>

        <SubHeader>Keyinfo</SubHeader>
        <HorizontalPanel>
          <div style={{ width: '400px', height: '380px' }}>
            <DistributionGraphComponent
              distribution={avtaleGiro.distribution}
            ></DistributionGraphComponent>
          </div>

          <AvtaleGiroKeyInfo agreement={avtaleGiro}></AvtaleGiroKeyInfo>
        </HorizontalPanel>

        <button onClick={() => setEditMenuVisible(!editMenuVisible)}>
          {editMenuVisible ? 'Cancel editing' : 'Edit agreement'}
        </button>
        {editMenuVisible && (
          <div>
            <div>
              <label>Amount</label>
              <br />
              <input
                defaultValue={avtaleGiro.amount}
                type="number"
                onChange={(e) => setNewAmount(parseInt(e.currentTarget.value))}
              ></input>
              <button
                disabled={newAmount < 1}
                onClick={() => {
                  if (confirm(`Press OK to update amount to ${newAmount} kr`)) {
                    getAccessTokenSilently().then((token) =>
                      dispatch(
                        updateAvtaleGiroAmountAction.started({
                          KID: avtaleGiro.KID,
                          amount: newAmount * 100,
                          token,
                        })
                      )
                    );
                  }
                }}
              >
                Set new sum
              </button>
            </div>
            <br />

            <div>
              <label>Status</label>
              <br />
              <select
                name="status"
                id="status"
                value={formattedStatus === 'Active' ? '1' : '0'}
                onChange={(e) => setNewStatus(parseInt(e.currentTarget.value))}
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
              <button
                onClick={() => {
                  if (
                    confirm(
                      `Press OK to update status to ${newStatus === 0 ? 'Inactive' : 'Active'}`
                    )
                  ) {
                    getAccessTokenSilently().then((token) =>
                      dispatch(
                        updateAvtaleGiroStatusAction.started({
                          KID: avtaleGiro.KID,
                          status: newStatus,
                          token,
                        })
                      )
                    );
                  }
                }}
              >
                Set new status
              </button>
            </div>
            <br />

            <div>
              <label>Charge day</label>
              <br />
              <input
                defaultValue={avtaleGiro.payment_date}
                type="number"
                onChange={(e) => setNewPaymentDate(parseInt(e.currentTarget.value))}
              ></input>
              <button
                disabled={newPaymentDate < 0 || newPaymentDate > 28}
                onClick={() => {
                  if (confirm(`Press OK to update payment date to ${newPaymentDate}`)) {
                    getAccessTokenSilently().then((token) =>
                      dispatch(
                        updateAvtaleGiroPaymentDateAction.started({
                          KID: avtaleGiro.KID,
                          paymentDate: newPaymentDate,
                          token,
                        })
                      )
                    );
                  }
                }}
              >
                Set new charge day
              </button>
            </div>
            <br />

            <div>
              <label>Distribution</label>
              <SharesSelection KID={avtaleGiro.KID} />
            </div>
          </div>
        )}
        <SubHeader>Meta</SubHeader>
        <NavLink to={`/avtalegiro`}>See all agreements</NavLink>
      </Page>
    );
  } else {
    return <Page>Loading...</Page>;
  }
};
