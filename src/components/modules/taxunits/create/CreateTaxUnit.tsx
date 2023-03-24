import React from 'react';
import { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { EffektButton } from '../../../style/elements/button.style';
import { useDispatch } from 'react-redux';
import { CreateTaxUnitAction } from '../../../../store/taxunits.ts/taxunits.actions';
import { CreateWrapper } from '../../../style/elements/create.style';
import { Plus } from 'react-feather';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  onSubmit(): void;
  donorID: number;
}


export const CreateTaxUnit: React.FunctionComponent<IProps> = ({ onSubmit, donorID }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<{ name: string, ssn: string }>({
    name: '',
    ssn: '',
  });

  const dispatch = useDispatch();

  const submit = () => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        CreateTaxUnitAction.started({
          token: token,
          donorID: donorID,
          taxUnit: { name: state.name, ssn: state.ssn },
        })
      );
    });
    onSubmit();
  };

  return (
    <CreateWrapper>
      <h3>New Tax Unit</h3>
      <EffektInput
        value={state.name}
        placeholder="name"
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        onChange={(e: any) => setState({ ...state, name: e.target.value })}
      ></EffektInput>
      <EffektInput
        value={state.ssn}
        placeholder="ssn / orgnr"
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        onChange={(e: any) => setState({ ...state, ssn: e.target.value })}
      ></EffektInput>
      <EffektButton onClick={submit}>
        Create <Plus size={16} />
      </EffektButton>
    </CreateWrapper>
  );
};
