import React, { useEffect } from 'react';
import { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { EffektButton } from '../../../style/elements/button.style';
import { useSelector, useDispatch } from 'react-redux';
import { IDistributionShare } from '../../../../models/types';
import { Plus } from 'react-feather';
import { CreateDistributionWrapper } from './CreateDistribution.style';
import { getDonorAction } from '../../../../store/donors/donor-page.actions';
import { AppState } from '../../../../models/state';
import { DistributionInput } from '../../shared/distribution-input/DistributionInput';
import Decimal from 'decimal.js';
import { createDistributionAction } from '../../../../store/distributions/distribution-input.actions';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  onSubmit(): void;
}

export const CreateDistribution: React.FunctionComponent<IProps> = ({ onSubmit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const donor = useSelector((state: AppState) => state.donorPage.donor);
  const distributionInput = useSelector(
    (state: AppState) => state.distributions.distributionInput.distribution
  );
  const [donorInput, setDonorInput] = useState<number>();
  const [validInput, setValidInput] = useState<boolean>(false);

  const [standardSplit, setStandardSplit] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Reset donor state when opening modal
  useEffect(() => {
    getAccessTokenSilently().then((token) => dispatch(getDonorAction.started({ id: 0, token })));
  }, [dispatch, getAccessTokenSilently]);

  // Check if donor exists
  useEffect(() => {
    if (donorInput !== undefined) {
      getAccessTokenSilently().then((token) =>
        dispatch(getDonorAction.started({ id: donorInput, token }))
      );
    }
  }, [dispatch, donorInput, getAccessTokenSilently]);

  useEffect(() => {
    let sumPercent = new Decimal(0);
    if (distributionInput) {
      distributionInput.forEach((org: IDistributionShare) => {
        sumPercent = sumPercent.plus(org.share);
      });
    }

    // Set valid input if distribution sums to 100 and donor with inputID exists
    if (parseInt(sumPercent.toFixed(0)) === 100) {
      if (donor) {
        setValidInput(true);
      }
    } else {
      setValidInput(false);
    }
  }, [dispatch, distributionInput, donor, donorInput]);

  const toggleStandardSplit = () => {
    setStandardSplit((current) => !current);
  };

  const submit = () => {
    let filteredDistributions: Array<IDistributionShare> = [];
    distributionInput.forEach((dist: IDistributionShare) => {
      if (dist.share.greaterThan(0)) {
        filteredDistributions.push(dist);
      }
    });

    if (donor) {
      getAccessTokenSilently().then((token) => {
        let distribution = filteredDistributions;
        if (standardSplit) {
          distribution = [];
        }
        dispatch(
          createDistributionAction.started({
            donor: { id: donor.id },
            distribution,
            token,
          })
        );
      });
    }
    onSubmit();
  };

  return (
    <CreateDistributionWrapper>
      <h3>New distribution</h3>
      <EffektInput
        type="text"
        inputMode="numeric"
        value={donorInput}
        placeholder="Donor ID"
        onChange={(e: any) => setDonorInput(e.target.value)}
      ></EffektInput>
      <EffektInput
        value={
          donor
            ? donor.name
            : donorInput
            ? `No donor with ID ${donorInput}`
            : 'Donor name (autofills)'
        }
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        disabled={true}
      ></EffektInput>
      <EffektButton onClick={toggleStandardSplit}>
        {standardSplit ? 'Set distribution manually' : 'Use standard share'}
      </EffektButton>
      {!standardSplit && <DistributionInput />}
      <EffektButton disabled={!validInput} onClick={submit}>
        Create <Plus size={16} />
      </EffektButton>
    </CreateDistributionWrapper>
  );
};
