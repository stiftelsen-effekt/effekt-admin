import React from 'react';
import { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { EffektButton } from '../../../style/elements/button.style';
import { useDispatch } from 'react-redux';
import { createDonorAction } from '../../../../store/donors/create-donor.actions';
import { CreateDonorWrapper } from './TaxUnitModal.style';
import { IDonor, ITaxUnit } from '../../../../models/types';
import { Plus } from 'react-feather';
import { useAuth0 } from '@auth0/auth0-react';
import { UpdateTaxUnitAction } from '../../../../store/taxunits.ts/taxunits.actions';

interface IProps {
  onSubmit(): void;
  taxUnit: ITaxUnit;
}

export const TaxUnitModal: React.FunctionComponent<IProps> = ({ onSubmit, taxUnit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<Partial<ITaxUnit>>({
    name: taxUnit.name,
    ssn: taxUnit.ssn,
  });

  const dispatch = useDispatch();

  const submit = () => {
    getAccessTokenSilently().then((token) => {
      if (state.name && state.ssn) {
        dispatch(
          UpdateTaxUnitAction.started({
            token: token,
            id: taxUnit.id,
            taxUnit: { name: state.name, ssn: state.ssn },
          })
        );
      } else {
        alert('Please fill all fields');
      }
    });
    onSubmit();
  };

  return (
    <CreateDonorWrapper>
      <h3>Tax unit</h3>
      <EffektInput
        value={state.name || ''}
        placeholder="name"
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        onChange={(e: any) => setState({ ...state, name: e.target.value })}
      ></EffektInput>
      <EffektInput
        value={state.ssn || ''}
        placeholder="ssn / orgnr"
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        onChange={(e: any) => setState({ ...state, ssn: e.target.value })}
      ></EffektInput>
      <EffektButton onClick={submit}>
        Update <Plus size={16} />
      </EffektButton>
    </CreateDonorWrapper>
  );
};
