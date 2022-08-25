import React, { useState } from 'react';
import {
  DonorSelectionWrapper,
  SelectionWrapper,
  DonorSelectionInput,
  DonorProperty,
} from './Donor.style';
import { EffektButton } from '../../../style/elements/button.style';
import { IDonor } from '../../../../models/types';
import { EffektInput } from '../../../style/elements/input.style';
import { shortDate } from '../../../../util/formatting';

import { useDispatch } from 'react-redux';
import { clearSelectedDonor } from '../../../../store/donors/donor-selection.actions';

interface IProps {
  selectedDonor: IDonor | undefined;
  openDonorSelectionDialog(): void;
}

export const KIDDonorComponent: React.FunctionComponent<IProps> = (props) => {
  const [donorId, setDonorId] = useState<string>('');

  //QUALITY: Move dispatch elsewere
  const dispatch = useDispatch();

  const donor = props.selectedDonor;

  let selectedDonor: JSX.Element = <div />
  if (donor !== undefined) {
    if (donor.id !== parseInt(donorId)) setDonorId(donor.id.toString());

    selectedDonor = (
      <SelectionWrapper>
        <DonorProperty>{donor.name}</DonorProperty>
        <DonorProperty>{donor.email}</DonorProperty>
        <DonorProperty>{shortDate(donor.registered)}</DonorProperty>
      </SelectionWrapper>
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (donor !== undefined && donor.id !== parseInt(donorId)) dispatch(clearSelectedDonor());
    setDonorId(event.target.value);
  };

  return (
    <DonorSelectionWrapper>
      <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <DonorSelectionInput>
          <strong>Donor</strong>
          <EffektInput
            value={donorId}
            onChange={handleChange}
            style={{ width: '100px' }}
            placeholder="DonorID"
          ></EffektInput>
        </DonorSelectionInput>
        {selectedDonor}
      </div>
      <EffektButton onClick={props.openDonorSelectionDialog}>Find</EffektButton>
    </DonorSelectionWrapper>
  );
};
