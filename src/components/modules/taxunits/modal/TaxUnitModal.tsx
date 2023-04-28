import React, { useEffect } from 'react';
import { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { EffektButton } from '../../../style/elements/button.style';
import { useDispatch, useSelector } from 'react-redux';
import { CreateDonorWrapper } from './TaxUnitModal.style';
import { ITaxUnit } from '../../../../models/types';
import { Plus } from 'react-feather';
import { useAuth0 } from '@auth0/auth0-react';
import { DeleteTaxUnitAction, UpdateTaxUnitAction } from '../../../../store/taxunits.ts/taxunits.actions';
import { AppState } from '../../../../models/state';
import { DateTime } from 'luxon';

interface IProps {
  onSubmit(): void;
  taxUnit: ITaxUnit;
  donorId: number;
}



export const TaxUnitModal: React.FunctionComponent<IProps> = ({ onSubmit, taxUnit, donorId }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState<Partial<ITaxUnit>>({
    name: taxUnit.name,
    ssn: taxUnit.ssn,
  });
  const [transferId, setTransferId] = useState<number | undefined>()
  const taxUnits = useSelector((state: AppState) => state.donorPage.taxUnits)
  const [printTaxUnit, setPrintTaxUnit] = useState<ITaxUnit[]>([]);

  const dispatch = useDispatch();

  const update = () => {
    getAccessTokenSilently().then((token) => {
      if (state.name && state.ssn) {
        const validator = require('@navikt/fnrvalidator')
        const fnr = validator.fnr(state.ssn)
        if (fnr.status === "valid" || state.ssn.length === 9) {
          dispatch(
            UpdateTaxUnitAction.started({
              token: token,
              id: taxUnit.id,
              taxUnit: { name: state.name, ssn: state.ssn },
            })
          );
        }
        else {
          alert("Invalid SSN or orgnr.");
        }
      } else {
        alert('Please fill all fields');
      }
    });
    onSubmit();
  };

  const deleteUnit = () => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        DeleteTaxUnitAction.started({
          token: token,
          id: taxUnit.id,
          donorId: donorId,
          transferId: transferId == -1 ? undefined : transferId,
        })
      );
    });
    onSubmit();
  };

  useEffect(() => {
    if (taxUnits && taxUnits.length > 0 && taxUnits[0].id !== -1) {
      const now = DateTime.local();
      const default_value: ITaxUnit = {
        id: -1,
        ssn: null,
        name: "Choose tax unit",
        numDonations: 0,
        sumDonations: 0,
        registered: now,
        archived: null,
      }
      setPrintTaxUnit([default_value].concat(taxUnits))
    }
  }, [taxUnits]);

  return (
    <CreateDonorWrapper>
      <h3>Tax unit</h3>
      <EffektInput
        value={state.name || ''}
        placeholder="name"
        onKeyDown={(e) => e.key === 'Enter' && update()}
        onChange={(e: any) => setState({ ...state, name: e.target.value })}
      ></EffektInput>
      <EffektInput
        value={state.ssn || ''}
        placeholder="ssn / orgnr"
        onKeyDown={(e) => e.key === 'Enter' && update()}
        onChange={(e: any) => setState({ ...state, ssn: e.target.value })}
      ></EffektInput>
      <EffektButton onClick={update}>
        Update <Plus size={16} />
      </EffektButton>
      <select onChange={(e) => setTransferId(parseInt(e.target.value))}>
        {printTaxUnit?.filter(t => t.id !== taxUnit.id && t.archived == null).map((t) => <option value={t.id}>{t.name} ({t.ssn})</option>)}
      </select>

      <EffektButton onClick={deleteUnit}>
        Delete <Plus size={16} />
      </EffektButton>
    </CreateDonorWrapper>
  );
};
