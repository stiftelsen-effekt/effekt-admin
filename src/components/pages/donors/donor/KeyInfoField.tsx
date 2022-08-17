import React, {useState} from "react";
import { DateTime } from 'luxon';
import { Edit, Save, XSquare, Check, X } from 'react-feather';
import { IDonor } from "../../../../models/types";
import { longDateTime } from "../../../../util/formatting";
import { updateDonorDataAction } from "../../../../store/donors/donor-page.actions";
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';


export enum FieldType {
  TextInput = 'text',
  DateTimeInput = 'datetime-local',
  BooleanInput = 'checkbox',
};

export const DonorKeyInfoField : React.FunctionComponent<{ label: string, field: string, type?: FieldType, donor: IDonor, validate?: Function, editable?: boolean }> = ({label, field, type, donor, validate, editable}) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(donor[field]);
  const [validValue, setValidValue] = useState(true);
  const [savedValue, setSavedValue] = useState(donor[field]);

  const persist = () => {
    getAccessTokenSilently().then((token) => {
      donor[field] = newValue;
      dispatch(updateDonorDataAction.started({ token: token, donor: donor }));
      setSavedValue(newValue);
    });
  };

  const toTextValue = (val: any) => {
    if (type === FieldType.DateTimeInput)
      return val.isValid ? longDateTime(val as DateTime) : "";
    if (type === FieldType.BooleanInput)
      return val ? <Check size={20}/> : <X size={20}/>;
    return val;
  };
  const toFieldValue = (val: any) => {
    if (type === FieldType.DateTimeInput)
      return val && val.isValid && (val as DateTime).toISO().substr(0, 16);
    return val ? val : "";
  };
  const fromFieldValue = (val: string | boolean) => {
    if (type === FieldType.DateTimeInput) {
      return DateTime.fromISO(val as string);
    }
    if (type === FieldType.BooleanInput)
      return Boolean(val);
    return val;
  };

  if (editable !== false)
    return (<><tr>
      <td>{label}</td>
      <td>
        {editing
        ? <input className={validValue ? "valid" : "invalid"} type={String(type)} checked={Boolean(newValue)} value={toFieldValue(newValue)} onChange={(e) => {
            const val = fromFieldValue(type === FieldType.BooleanInput ? e.currentTarget.checked : e.currentTarget.value);
            setNewValue(val);
            if (validate)
              setValidValue(validate(val));
          }}/>
        : <span className={validValue ? "valid" : "invalid"}>{toTextValue(newValue)}</span>}
      </td>
      <td>
        {editing
        ? <button onClick={() => {setNewValue(savedValue);setEditing(false);setValidValue(true);}}><XSquare size={16}/></button>
        : <button onClick={() => {setEditing(true);}}><Edit size={16}/></button>}
      </td>
      <td>
        <button style={{opacity: Number(editing)}} disabled={!editing} onClick={() => {persist();setEditing(false);}}><Save size={16}/></button>
      </td>
    </tr></>);
  else
    return (<><tr>
      <td>{label}</td>
      <td><span className="valid">{toTextValue(newValue)}</span></td>
      <td/><td/>
    </tr></>);
};
