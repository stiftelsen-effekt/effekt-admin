import React, { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { DistributionWrapper, DistributionItem, DistributionRow } from './Distribution.style';

import Decimal from 'decimal.js';
import { IDistributionShare, IDistributionStandardSplit } from '../../../../models/types';
import { EffektButton } from '../../../style/elements/button.style';

interface IProps {
  onChange(distribution: IDistributionStandardSplit): void;
  distribution: IDistributionStandardSplit;
}

export const KIDDistribution: React.FunctionComponent<IProps> = ({ distribution, onChange }) => {
  const [standardSplit, setStandardSplit] = useState<boolean>(distribution.standardSplit);

  const organizationValueChanged = (orgId: number, value: string) => {
    try {
      value = value === '' ? '0' : value;
      let parsedValue = new Decimal(value);
      let updatedDistribution = distribution;
      updatedDistribution.shares = distribution.shares.map((dist: IDistributionShare) => {
        if (dist.organizationId === orgId)
          return {
            ...dist,
            share: parsedValue,
          };
        else return dist;
      });
      updatedDistribution.standardSplit = distribution.standardSplit;
      onChange(updatedDistribution);
    } catch (ex) {
      console.log('Could not parse distribution input: ', value);
    }
  };

  const createItems = () => {
    let distributionItems = distribution.shares.map((dist: IDistributionShare, i: number) => (
      <DistributionItem key={i}>
        <span>{dist.abbriv}</span>
        <EffektInput
          type="number"
          placeholder="sum"
          defaultValue={dist.share.toString()}
          style={{ width: '110px' }}
          onChange={(e) => {
            organizationValueChanged(dist.organizationId, e.target.value);
          }}
        ></EffektInput>
      </DistributionItem>
    ));

    return distributionItems;
  };

  const createLines = (distributionItems: any) => {
    let distributionLines: JSX.Element[] = [];
    for (let i = 0; i < distributionItems.length / 3; i++) {
      let startPickingAt = i * 3;
      let endPickingAt = startPickingAt + 3;

      distributionLines.push(
        <DistributionRow key={i}>
          {distributionItems.slice(startPickingAt, endPickingAt)}
        </DistributionRow>
      );
    }
    return distributionLines;
  };

  const toggleStandardSplit = () => {
    const nextStandardSplit = !distribution.standardSplit;
    distribution.standardSplit = nextStandardSplit;
    setStandardSplit(nextStandardSplit);
    onChange(distribution);
  };

  const createDistribution = () => {
    let distributionItems = createItems();
    let distributionLines = createLines(distributionItems);
    return (
      <>
        <EffektButton onClick={() => toggleStandardSplit()}>
          {standardSplit ? 'Set distribution manually' : 'Use standard share'}
        </EffektButton>
        <DistributionWrapper>
          {!standardSplit ? distributionLines : 'Using standard distribution'}
        </DistributionWrapper>
      </>
    );
  };

  return createDistribution();
};
