import React, { useEffect, useState } from 'react';
import { IDataOwner } from '../../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { fetchOwnersAction } from '../../../store/owners/owners.actions';
import { AppState } from '../../../models/state';

interface IProps {
  suggestedMetaOwnerID?: number;
  onChanged(input: number): void;
}

export const OwnerSelect: React.FunctionComponent<IProps> = ({ suggestedMetaOwnerID, onChanged }) => {
  const dispatch = useDispatch();

  const dataOwners = useSelector((state: AppState) => state.dataOwner.owners);
  if (!dataOwners) {
    dispatch(fetchOwnersAction.started(undefined));
    return <div>Fetching data owners...</div>;
  }

  const mapOwnerToOption = (owner: IDataOwner) => ({ value: owner.id, label: owner.name });
  const ownersOptions = dataOwners.map((owner) => mapOwnerToOption(owner));

  const suggestedOption = dataOwners.find((owner) => owner.id === suggestedMetaOwnerID)
  const defaultOption = dataOwners.find((owner) => owner.default === true) || dataOwners[0]

  return (
    <React.Fragment>
      <Select
        options={ ownersOptions }
        value={ mapOwnerToOption(suggestedOption ? suggestedOption : defaultOption) }
        onChange={ (selected: any) => onChanged(selected.value) }
      ></Select>
    </React.Fragment>
  );
};
