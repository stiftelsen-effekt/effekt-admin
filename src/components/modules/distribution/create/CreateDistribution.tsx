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

interface IProps {
  onSubmit(): void;
}

export const CreateDistribution: React.FunctionComponent<IProps> = ({ onSubmit }) => {
  const donor = useSelector((state: AppState) => state.donorPage.donor)
  const distributionInput = useSelector((state: AppState) => state.distributions.distributionInput.distribution)
  const [donorInput, setDonorInput] = useState<number>();
  const [validInput, setValidInput] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Reset donor state when opening modal
  useEffect(() => {
    dispatch(getDonorAction.started(0))
  }, [dispatch])

  // Check if donor exists
  useEffect(() => {
    if(donorInput !== undefined) {
      dispatch(getDonorAction.started(donorInput))
    }
  }, [dispatch, donorInput])

  useEffect(() => {
    let sumPercent = new Decimal(0)
    distributionInput.forEach((org: IDistributionShare) => {
        sumPercent = sumPercent.plus(org.share)
    })

    // Set valid input if distribution sums to 100 and donor with inputID exists
    if (parseInt(sumPercent.toFixed(0)) === 100) {
      if (donor) {
        setValidInput(true)
      }
    } else {
      setValidInput(false)
    }

  }, [dispatch, distributionInput, donor, donorInput])

  const submit = () => {
    let filteredDistributions: Array<IDistributionShare> = []
    distributionInput.forEach((dist: IDistributionShare) => {
      if(dist.share.greaterThan(0)) {
        filteredDistributions.push(dist)
      }
    });

    dispatch(createDistributionAction.started({donor: {id: donor.id}, distribution: filteredDistributions}))
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
        value={donor ? donor.name : (donorInput ? `No donor with ID ${donorInput}` : "Donor name (autofills)")}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        disabled={true}
      ></EffektInput>
      <DistributionInput />
      <EffektButton disabled={!validInput} onClick={submit}>Create <Plus size={16}/></EffektButton>
    </CreateDistributionWrapper>
  );
};
