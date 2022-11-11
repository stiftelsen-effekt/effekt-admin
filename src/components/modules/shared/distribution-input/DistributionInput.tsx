/* eslint-disable no-restricted-globals */
import { useAuth0 } from '@auth0/auth0-react';
import Decimal from 'decimal.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';
import Validator from 'validator';
import { AppState } from '../../../../models/state';
import { IDistribution, IDistributionShare, ITaxUnit } from '../../../../models/types';
import {
  getDonorAction,
  getDonorTaxUnitsAction,
} from '../../../../store/donors/donor-page.actions';
import { EffektCheck } from '../../../style/elements/effekt-check/effekt-check.component';
import { EffektInput } from '../../../style/elements/input.style';
import { TextInput } from '../../../style/elements/TextInput/TextInput';

export interface Organization {
  abbriv: string;
  name: string;
  id: number;
  infoUrl: string;
  shortDesc: string;
  standardShare: number;
}

export interface OrganizationResponse {
  content: Organization[];
}

const noTaxUnit = { label: 'No tax unit', value: undefined };
const mapTaxUnitToSelectOption = (taxUnit?: ITaxUnit) =>
  taxUnit
    ? {
        label: `${taxUnit.name} (${taxUnit.ssn})`,
        value: taxUnit.id,
      }
    : noTaxUnit;

export const DistributionInput: React.FC<{
  distribution: Partial<IDistribution>;
  onChange: (distribution: Partial<IDistribution>) => void;
}> = ({ distribution, onChange }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const taxUnits = useSelector((state: AppState) => state.distributions.distributionInput.taxUnits);
  const organizations = useSelector((state: AppState) => state.organizations.active);
  const donorName = useSelector(
    (state: AppState) => state.distributions.distributionInput.donorName
  );

  const [sumPercentage, setSumPercentage] = useState<number>();

  const [donorInput, setDonorInput] = useState<string>();
  const [standardDistributionInput, setStandardDistributionInput] = useState<boolean>(
    distribution.standardDistribution ?? false
  );

  const [taxUnitInput, setTaxUnitInput] = useState<{ label: string; value?: number }>(
    mapTaxUnitToSelectOption(distribution.taxUnit) ?? noTaxUnit
  );

  useEffect(() => {
    let newShares: IDistributionShare[] = [];
    organizations &&
      organizations.forEach((org) => {
        newShares.push({ ID: org.id, abbriv: org.abbriv, share: new Decimal(0) });
      });
  }, [organizations]);

  useEffect(() => {
    if (distribution.shares) {
      let sum = new Decimal(0);
      distribution.shares.forEach((org: IDistributionShare) => {
        sum = sum.plus(org.share);
      });
      setSumPercentage(parseInt(sum.toFixed(0)));
    }
  }, [distribution]);

  useEffect(() => {
    if (distribution.donor) {
      setDonorInput(distribution.donor?.id?.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (standardDistributionInput) {
      let standardShares: IDistributionShare[] = [];
      organizations &&
        organizations.forEach((org) => {
          if (org.standardShare > 0) {
            standardShares.push({
              ID: org.id,
              abbriv: org.abbriv,
              share: new Decimal(org.standardShare),
            });
          }
        });
      onChange({
        ...distribution,
        shares: standardShares,
        standardDistribution: standardDistributionInput,
      });
    } else {
      onChange({ ...distribution, shares: [], standardDistribution: standardDistributionInput });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [standardDistributionInput]);

  useEffect(() => {
    if (typeof donorInput !== 'undefined' && Validator.isInt(donorInput)) {
      if (
        typeof distribution.donor !== 'undefined' &&
        typeof distribution.donor.id !== 'undefined'
      ) {
        getAccessTokenSilently().then((token) => {
          dispatch(
            getDonorAction.started({ id: parseInt(donorInput) ?? distribution.donor?.name, token })
          );
          dispatch(
            getDonorTaxUnitsAction.started({
              id: parseInt(donorInput) ?? distribution.donor?.id,
              token,
            })
          );
        });
      } else {
        getAccessTokenSilently().then((token) => {
          dispatch(getDonorAction.started({ id: parseInt(donorInput), token }));
          dispatch(
            getDonorTaxUnitsAction.started({
              id: parseInt(donorInput),
              token,
            })
          );
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorInput]);

  useEffect(() => {
    onChange({
      ...distribution,
      taxUnit: taxUnits.find((t) => {
        return t.id === taxUnitInput?.value;
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxUnitInput]);

  if (!organizations) return <div>Failed fetching organizations</div>;

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
        <EffektInput
          type="text"
          inputMode="numeric"
          value={donorInput}
          placeholder="Donor ID"
          onChange={(e: any) => setDonorInput(e.target.value)}
        ></EffektInput>
        <EffektInput
          value={donorName ?? distribution.donor?.name ?? 'Navn fylles ut automatisk'}
          disabled={true}
        ></EffektInput>
      </div>
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
        onChange={(checked) => {
          setStandardDistributionInput(checked);
        }}
        inverted={false}
      />
      <div style={{ height: standardDistributionInput ? '0px' : 'auto', overflow: 'hidden' }}>
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
                    distribution.shares
                      ? distribution.shares.filter((dist) => dist.ID === org.id).length === 1
                        ? distribution.shares
                            .filter((dist) => dist.ID === org.id)[0]
                            .share.toString()
                        : ''
                      : ''
                  }
                  onChange={(e: { target: { value: string } }) => {
                    let newShares: IDistributionShare[] = [
                      ...(distribution.shares ? distribution.shares : []),
                    ];

                    organizations.forEach((org) => {
                      if (newShares.filter((share) => share.ID === org.id).length === 0) {
                        newShares.push({
                          ID: org.id,
                          abbriv: org.abbriv,
                          share: new Decimal(0),
                        });
                      }
                    });

                    // Index of changed organization
                    const index = newShares
                      .map((s) => {
                        return s.ID;
                      })
                      .indexOf(org.id);

                    newShares[index].share = Validator.isInt(e.target.value)
                      ? new Decimal(e.target.value)
                      : new Decimal(0);
                    onChange({
                      ...distribution,
                      shares: newShares.filter((s) => s.share.toNumber() > 0),
                    });
                  }}
                  denomination="%"
                  selectOnClick
                />
              </div>
            ))}
          </div>
          {sumPercentage === 100 ? null : (
            <strong>{`You have distributed ${sumPercentage} of 100 percent`}</strong>
          )}
        </Wrapper>
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  margin-top: 10px;
  width: 400px;
`;
