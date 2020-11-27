import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DonorSelectionWrapper,
  SelectionWrapper,
  DonorSelectionInput,
  DonorProperty,
} from './donor.component.style';
import { EffektButton } from '../../elements/button.style';
import { IDonor } from '../../../../types';
import { EffektInput } from '../../elements/input.style';
import { shortDate } from '../../../../util/formatting';

import { clearSelectedDonor } from '../../../../store/donor/select/donor-selection.actions';

interface IProps {
  selectedDonor: IDonor | undefined;
  openDonorSelectionDialog(): void;
}

export const KIDDonorComponent: React.FunctionComponent<IProps> = (props) => {
  const [donorId, setDonorId] = useState<string>('');

  // QUALITY: Move dispatch elsewere
  const dispatch = useDispatch();

  const donor = props.selectedDonor;

  let selectedDonor = null;
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
    if (donor !== undefined && donor.id !== parseInt(donorId))
      dispatch(clearSelectedDonor());
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
            style={{ width: '70px' }}
            placeholder="DonorID"
          />
        </DonorSelectionInput>
        {selectedDonor}
      </div>
      <EffektButton onClick={props.openDonorSelectionDialog}>Find</EffektButton>
    </DonorSelectionWrapper>
  );
};
