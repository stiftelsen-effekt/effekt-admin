import React, { useEffect } from 'react';
import { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { EffektButton } from '../../../style/elements/button.style';
import { useSelector, useDispatch } from 'react-redux';
import { IDistributionShare, ITaxUnit } from '../../../../models/types';
import { Plus } from 'react-feather';
import { CreateDistributionWrapper } from './CreateDistribution.style';
import {
  getDonorAction,
  getDonorTaxUnitsAction,
} from '../../../../store/donors/donor-page.actions';
import { AppState } from '../../../../models/state';
import { DistributionInput } from '../../shared/distribution-input/DistributionInput';
import Decimal from 'decimal.js';
import { createDistributionAction } from '../../../../store/distributions/distribution-input.actions';
import { useAuth0 } from '@auth0/auth0-react';
import Select from 'react-select';
import { EffektCheck } from '../../../style/elements/effekt-check/effekt-check.component';

interface IProps {
  onSubmit(): void;
}

export const CreateDistribution: React.FunctionComponent<IProps> = ({ onSubmit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const donor = useSelector((state: AppState) => state.donorPage.donor);
  const taxUnits = useSelector((state: AppState) => state.distributions.distributionInput.taxUnits);
  const distributionInput = useSelector(
    (state: AppState) => state.distributions.distributionInput.distribution
  );
  const [donorInput, setDonorInput] = useState<number>();
  const [standardDistributionInput, setStandardDistributionInput] = useState<boolean>(false);
  const noTaxUnit = { label: 'No tax unit', value: undefined };
  const [taxUnitInput, setTaxUnitInput] = useState<{ label: string; value?: number }>(noTaxUnit);
  const [validInput, setValidInput] = useState<boolean>(false);

  const dispatch = useDispatch();

  // Reset donor state when opening modal
  useEffect(() => {
    getAccessTokenSilently().then((token) => dispatch(getDonorAction.started({ id: 0, token })));
  }, [dispatch, getAccessTokenSilently]);

  // Check if donor exists
  useEffect(() => {
    if (donorInput !== undefined && donorInput.toString() !== '') {
      getAccessTokenSilently().then((token) => {
        dispatch(getDonorAction.started({ id: donorInput, token }));
        dispatch(getDonorTaxUnitsAction.started({ id: donorInput, token }));
      });
    }
  }, [dispatch, donorInput, getAccessTokenSilently]);

  useEffect(() => {
    let sumPercent = new Decimal(0);
    distributionInput.forEach((org: IDistributionShare) => {
      sumPercent = sumPercent.plus(org.share);
    });

    // Set valid input if distribution sums to 100 and donor with inputID exists
    if (parseInt(sumPercent.toFixed(0)) === 100) {
      if (donor) {
        setValidInput(true);
      }
    } else {
      setValidInput(false);
    }
  }, [dispatch, distributionInput, donor, donorInput]);

  const submit = () => {
    let filteredDistributions: Array<IDistributionShare> = [];
    distributionInput.forEach((dist: IDistributionShare) => {
      if (dist.share.greaterThan(0)) {
        filteredDistributions.push(dist);
      }
    });

    if (donor) {
      getAccessTokenSilently().then((token) =>
        dispatch(
          createDistributionAction.started({
            donor: { id: donor.id },
            distribution: filteredDistributions,
            taxUnitId: taxUnitInput.value,
            standardDistribution: standardDistributionInput,
            token,
          })
        )
      );
    }
    onSubmit();
  };

  const mapTaxUnitToSelectOption = (taxUnit?: ITaxUnit) =>
    taxUnit
      ? {
          label: `${taxUnit.name} (${taxUnit.ssn})`,
          value: taxUnit.id,
        }
      : noTaxUnit;

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
      <div style={{ zIndex: 10, position: 'relative' }}>
        <Select
          options={[noTaxUnit, ...taxUnits.map((unit) => mapTaxUnitToSelectOption(unit))]}
          value={mapTaxUnitToSelectOption(taxUnits.find((unit) => unit.id === taxUnitInput.value))}
          onChange={(option: any) => setTaxUnitInput(option)}
        />
      </div>
      <EffektCheck
        label="Standard distribution"
        checked={standardDistributionInput}
        onChange={(checked) => setStandardDistributionInput(checked)}
        inverted={false}
      />
      <div style={{ height: standardDistributionInput ? '0px' : 'auto', overflow: 'hidden' }}>
        <DistributionInput />
      </div>
      <EffektButton disabled={!validInput} onClick={submit}>
        Create <Plus size={16} />
      </EffektButton>
    </CreateDistributionWrapper>
  );
};
