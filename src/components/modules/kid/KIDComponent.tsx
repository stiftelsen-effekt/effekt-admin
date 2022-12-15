import React, { useEffect, useState } from 'react';

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
import { IOrganization, IDistributionShare } from '../../../models/types';

import Decimal from 'decimal.js';

//SubComponents
import { KIDDonorComponent } from './donor/Donor';
import { KIDControls } from './controls/KIDControls';
import { KIDDistribution } from './distribution/Distribution';
import { calculateDistributionSum } from './kid.util';
import { EffektCheck } from '../../style/elements/effekt-check/effekt-check.component';

interface IProps {
  donationAmount?: number;
  organizations: Array<IOrganization>;
  KID?: string;
  distribution: Array<IDistributionShare>;
  standardDistribution?: boolean;
  setStandardDistribution?(boolean: boolean): void;
  onChange(distribution: Array<IDistributionShare>): void;
  hideDonorField?: boolean;
}

export const KIDComponent: React.FunctionComponent<IProps> = ({
  donationAmount,
  organizations,
  KID,
  onChange,
  distribution,
  standardDistribution,
  setStandardDistribution,
  hideDonorField,
}) => {
  const dispatch = useDispatch();

  const [defaultDistribution, setDefaultDistribution] = useState<undefined | Array<IDistributionShare>>(undefined);
  const [distributionSum, setDistributionSum] = useState<Decimal>(
    calculateDistributionSum(distribution)
  );

  useEffect(() => {
    if (defaultDistribution === undefined) setDefaultDistribution(distribution);
  }, [defaultDistribution, distribution]);

  //TODO: Add support for absolute values
  const distributionMax = new Decimal(100);

  const donor = useSelector((state: AppState) => state.donorSelector.selectedDonor);

  const openDonorSelectionDialog = () => {
    dispatch(showDonorSelectionComponent());
  };

  const distributionChanged = (distribution: Array<IDistributionShare>) => {
    setDistributionSum(calculateDistributionSum(distribution));
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
          {standardDistribution !== undefined && setStandardDistribution &&
            <EffektCheck
              label="Standard distribution"
              checked={standardDistribution}
              onChange={(checked) => {
                setStandardDistribution(checked);
                // Reset distribution input when standard distribution is checked
                if (defaultDistribution) onChange(defaultDistribution);
              }}
              inverted={false}
            />
          }
          {!standardDistribution &&
            <KIDDistribution
              distribution={distribution}
              onChange={distributionChanged}
            ></KIDDistribution>
          }
        </div>

        {/* Controls */}
        <div>
          <KIDControls
            distributionMax={distributionMax}
            distributionSum={distributionSum}
          ></KIDControls>
        </div>
      </KIDInnerContent>
      <KIDLowerBracket></KIDLowerBracket>
    </KIDWrapper>
  );
};
