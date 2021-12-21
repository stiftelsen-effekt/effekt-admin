import React from 'react';
import { IDataOwner } from '../../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { setCurrentOwnerAction, fetchOwnersAction } from '../../../store/owners/owners.actions';
import { AppState } from '../../../models/state';

export const OwnerSelect: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const dataOwners = useSelector((state: AppState) => state.dataOwner.owners);
  const currentOwner = useSelector((state: AppState) => state.dataOwner.current);
  if (!dataOwners || !currentOwner) {
    dispatch(fetchOwnersAction.started(undefined));
    return <div>Fetching data owners...</div>;
  }

  const mapOwnerToOption = (owner: IDataOwner) => ({ value: owner.id, label: owner.name });
  const ownersOptions = dataOwners.map((owner) => mapOwnerToOption(owner));

  return (
    <React.Fragment>
      <Select
        options={ownersOptions}
        value={mapOwnerToOption(currentOwner)}
        onChange={(selected: any) => {
          let selectedOwner = dataOwners.find((owner) => selected.value === owner.id);
          if (selectedOwner) dispatch(setCurrentOwnerAction(selectedOwner));
        }}
      ></Select>
    </React.Fragment>
  );
};
