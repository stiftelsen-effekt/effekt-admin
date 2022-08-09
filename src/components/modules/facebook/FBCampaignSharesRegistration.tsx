import React, { useState } from 'react';
import { IDistributionShare, IOrganization } from '../../../models/types';
import { useDispatch } from 'react-redux';
import { FBCampaign } from '../../../models/state';
import { KIDComponent } from '../kid/KIDComponent';

import { mapOrgToDist } from '../kid/kid.util';
import { useAuth0 } from '@auth0/auth0-react';
import { EffektButton } from '../../style/elements/button.style';
import {
  ButtonWrapper,
  CampaignInfoWrapper,
  CampaignNameWrapper,
  FBCampaignSharesRegistrationWrapper,
} from './FBCampaignSharesRegistration.style';
import { registerCampaignAction } from '../../../store/facebook/facebook.actions';
import { toastError } from '../../../util/toasthelper';

interface IProps {
  organizations: Array<IOrganization>;
  campaigns: Array<FBCampaign>;
}

export const FBCampaignSharesRegistration: React.FunctionComponent<IProps> = ({
  organizations,
  campaigns,
}) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [distributions, setDistributions] = useState<Array<IDistributionShare>>(
    mapOrgToDist(organizations)
  );

  const currentCampaign = campaigns[0];

  const submit = () => {
    const accShares = distributions.reduce((acc, distribution) => {
      acc += parseFloat(String(distribution.share));
      return acc;
    }, 0.0);
    if (accShares === 100) {
      getAccessTokenSilently().then((token) => {
        dispatch(
          registerCampaignAction.started({
            token,
            campaign: { id: currentCampaign.ID, shares: distributions },
          })
        );
      });
    } else {
      toastError('Shares do not add up to 100', 'Accumulated shares: ' + accShares);
    }
  };

  return (
    <FBCampaignSharesRegistrationWrapper>
      <CampaignInfoWrapper>
        <CampaignNameWrapper>{currentCampaign['fundraiserTitle']}</CampaignNameWrapper>
        <div>Owner: {currentCampaign['campaignOwnerName']}</div>
        <a href={currentCampaign['permalink']} target="_blank" rel="noreferrer">
          Facebook campaign
        </a>
      </CampaignInfoWrapper>

      <KIDComponent
        organizations={organizations}
        distribution={distributions}
        onChange={(distribution: Array<IDistributionShare>) => setDistributions(distribution)}
        hideDonorField={true}
      ></KIDComponent>
      <ButtonWrapper>
        <div>{campaigns.length} campaigns remaining </div>
        <EffektButton onClick={() => submit()}>Save shares</EffektButton>
      </ButtonWrapper>
    </FBCampaignSharesRegistrationWrapper>
  );
};
