import React from "react";
import { IDataOwner } from "../../../models/types";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchOwnersAction } from "../../../store/owners/owners.actions";
import { AppState } from "../../../models/state";

export const OwnerSelect: React.FC<{
  value: IDataOwner | undefined;
  onChange: (owner: IDataOwner) => void;
}> = ({ value, onChange }) => {
  const dispatch = useDispatch();

  const dataOwners = useSelector((state: AppState) => state.dataOwner.owners);
  if (!dataOwners) {
    dispatch(fetchOwnersAction.started(undefined));
    return <div>Fetching data owners...</div>;
  }

  const mapOwnerToOption = (owner: IDataOwner) => ({ value: owner.id, label: owner.name });
  const ownersOptions = dataOwners.map((owner) => mapOwnerToOption(owner));

  return (
    <React.Fragment>
      <Select
        options={ownersOptions}
        value={typeof value !== "undefined" ? mapOwnerToOption(value) : undefined}
        onChange={(selected: any) => {
          let selectedOwner = dataOwners.find((owner) => selected.value === owner.id);
          if (selectedOwner) {
            onChange(selectedOwner);
          }
        }}
      ></Select>
    </React.Fragment>
  );
};
