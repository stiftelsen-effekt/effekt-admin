import Decimal from 'decimal.js';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../../../../models/state';
import { IDistributionShare } from '../../../../models/types';
import { TextInput } from '../../../style/elements/TextInput/TextInput';
import Validator from 'validator';

export const DistributionSharesInput: React.FC<{
  shares: Array<IDistributionShare>;
  onChange: (shares: Array<IDistributionShare>) => void;
}> = ({ shares, onChange }) => {
  const organizations = useSelector((state: AppState) => state.organizations.active);
  const sumPercentage = shares.reduce((acc, share) => acc.add(share.share), new Decimal(0));

  if (!organizations) {
    return <span>No organizations loaded</span>;
  }

  return (
    <Wrapper>
      <div>
        {organizations.map((org) => (
          <div key={org.id}>
            <TextInput
              label={org.name}
              key={org.id}
              type="tel"
              inputMode="numeric"
              placeholder="0"
              value={
                shares
                  ? shares.filter((dist) => dist.id === org.id).length === 1
                    ? shares.filter((dist) => dist.id === org.id)[0].share.toString()
                    : ''
                  : ''
              }
              onChange={(e: { target: { value: string } }) => {
                let newShares: IDistributionShare[] = [...(shares ? shares : [])];

                organizations.forEach((org) => {
                  if (newShares.filter((share) => share.id === org.id).length === 0) {
                    newShares.push({
                      id: org.id,
                      abbriv: org.abbriv,
                      share: new Decimal(0),
                    });
                  }
                });

                // Index of changed organization
                const index = newShares
                  .map((s) => {
                    return s.id;
                  })
                  .indexOf(org.id);

                newShares[index].share = Validator.isInt(e.target.value)
                  ? new Decimal(e.target.value)
                  : new Decimal(0);
                onChange(newShares.filter((s) => s.share.greaterThan(0)));
              }}
              denomination="%"
              selectOnClick
            />
          </div>
        ))}
      </div>
      {!sumPercentage.equals(100) && (
        <strong>{`You have distributed ${sumPercentage} of 100 percent`}</strong>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  width: 400px;
`;
