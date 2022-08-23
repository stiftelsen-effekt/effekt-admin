import React from 'react';
import { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { EffektButton } from '../../../style/elements/button.style';
import { useDispatch } from 'react-redux';
import { createDonorAction } from '../../../../store/donors/create-donor.actions';
import { CreateDonorWrapper } from './CreateDonor.style';
import { IDonor } from '../../../../models/types';
import { Plus } from 'react-feather';
import { useAuth0 } from '@auth0/auth0-react';

interface IProps {
  onSubmit(): void;
}

export const CreateDonor: React.FunctionComponent<IProps> = ({ onSubmit }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<Partial<IDonor>>({
    email: '',
    name: '',
    ssn: '',
  });

  const dispatch = useDispatch();

  const submit = () => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        createDonorAction.started({
          token: token,
          donor: { email: state.email, name: state.name, ssn: state.ssn },
        })
      );
    });
    onSubmit();
  };

  return (
    <CreateDonorWrapper>
      <h3>New donor</h3>
      <EffektInput
        value={state.email}
        placeholder="email"
        onChange={(e: any) => setState({ ...state, email: e.target.value })}
      ></EffektInput>
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
    </CreateDonorWrapper>
  );
};
