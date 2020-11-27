import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteDonationAction } from '../../../../../store/donations/list/donations-list.actions';
import { StyledDeleteButton } from '../donations-list.component.style';

export const DeleteButton: React.FC<{
  id?: number;
  donor?: string;
  sum?: number;
}> = ({ id, donor, sum }) => {
  const dispatch = useDispatch();

  return (
    <StyledDeleteButton
      onClick={() => {
        const sure = window.confirm(
          `Do you really want to delete the donation of ${donor} with sum ${sum}`,
        );
        if (sure) dispatch(deleteDonationAction.started(id));
      }}
    >
      X
    </StyledDeleteButton>
  );
};
