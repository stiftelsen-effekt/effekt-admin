import React, { useState } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../models/state';

import { showDonorSelectionComponent } from '../../../store/donors/donor-selection.actions';

//Styling
import {
  KIDWrapper,
  KIDUpperBracket,
  KIDLowerBracket,
  KIDInnerContent,
} from './KIDComponent.style';

//Models
import {
  IOrganization,
  IDistributionShare,
  IDistributionStandardSplit,
} from '../../../models/types';

import Decimal from 'decimal.js';

//SubComponents
import { KIDDonorComponent } from './donor/Donor';
import { KIDControls } from './controls/KIDControls';
import { KIDDistribution } from './distribution/Distribution';
import { calculateDistributionSum } from './kid.util';

interface IProps {
  donationAmount?: number;
  organizations: Array<IOrganization>;
  KID?: string;
  distribution: IDistributionStandardSplit;
  onChange(distribution: IDistributionStandardSplit): void;
  hideDonorField?: boolean;
}

export const KIDComponent: React.FunctionComponent<IProps> = ({
  donationAmount,
  organizations,
  KID,
  onChange,
  distribution,
  hideDonorField,
}) => {
  const dispatch = useDispatch();

  const [distributionSum, setDistributionSum] = useState<Decimal>(
    calculateDistributionSum(distribution.shares)
  );
  //TODO: Add support for absolute values
  const distributionMax = new Decimal(100);

  const donor = useSelector((state: AppState) => state.donorSelector.selectedDonor);

  const openDonorSelectionDialog = () => {
    dispatch(showDonorSelectionComponent());
  };

  const distributionChanged = (distribution: IDistributionStandardSplit) => {
    setDistributionSum(calculateDistributionSum(distribution.shares));
    onChange(distribution);
  };

  return (
    <KIDWrapper>
      <KIDUpperBracket></KIDUpperBracket>
      <KIDInnerContent>
        {/* Donor */}
        {!hideDonorField && (
          <div>
            <KIDDonorComponent
              selectedDonor={donor}
              openDonorSelectionDialog={openDonorSelectionDialog}
            ></KIDDonorComponent>
          </div>
        )}

        {/* Split */}
        <div>
          <KIDDistribution
            distribution={distribution}
            onChange={distributionChanged}
          ></KIDDistribution>
        </div>

        {/* Controls */}
        {!distribution.standardSplit && (
          <div>
            <KIDControls
              distributionMax={distributionMax}
              distributionSum={distributionSum}
            ></KIDControls>
          </div>
        )}
      </KIDInnerContent>
      <KIDLowerBracket></KIDLowerBracket>
    </KIDWrapper>
  );
};
