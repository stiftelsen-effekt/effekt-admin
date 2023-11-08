import React from 'react';
import { useState } from 'react';
import { EffektInput } from '../../../style/elements/input.style';
import { EffektButton } from '../../../style/elements/button.style';
import { useDispatch, useSelector } from 'react-redux';
import { NewTaxUnitModalWrapper } from './NewTaxUnitModal.style';
import { ITaxUnit } from '../../../../models/types';
import { Plus } from 'react-feather';
import { useAuth0 } from '@auth0/auth0-react';
import { CreateTaxUnitAction } from '../../../../store/taxunits.ts/taxunits.actions';
import { AppState } from '../../../../models/state';

interface IProps {
    onSubmit(): void;
    donorId: number;
}

const validator = require('@navikt/fnrvalidator')

export const NewTaxUnitModal: React.FunctionComponent<IProps> = ({ onSubmit, donorId }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState<Partial<ITaxUnit>>({});
    const taxUnits = useSelector((state: AppState) => state.donorPage.taxUnits)

    const dispatch = useDispatch();

    const add = () => {
        if (!(state.name && state.ssn)) {
            alert('Please fill all fields');
            return;
        }
        const fnr = validator.fnr(state.ssn)
        if (!(fnr.status === "valid" || state.ssn.length === 9)) {
            alert("Invalid SSN or orgnr.");
            return;
        }
        if (taxUnits?.some(taxUnit => taxUnit.ssn === state.ssn)) {
            alert("SSN or orgnr already exists.");
            return;
        }
        getAccessTokenSilently().then((token) => {
            if (!(state.name && state.ssn)) {
                alert('Please fill all fields');
                return;
            }
            dispatch(
                CreateTaxUnitAction.started({
                    token: token,
                    donorId: donorId,
                    taxUnit: { name: state.name, ssn: state.ssn },
                })
            );
        });
        onSubmit();
    };

    return (
        <NewTaxUnitModalWrapper>
            <h3>New tax unit</h3>
            <EffektInput
                value={state.name || ''}
                placeholder="name"
                onKeyDown={(e) => e.key === 'Enter' && add()}
                onChange={(e: any) => setState({ ...state, name: e.target.value })}
            ></EffektInput>
            <EffektInput
                value={state.ssn || ''}
                placeholder="ssn / orgnr"
                onKeyDown={(e) => e.key === 'Enter' && add()}
                onChange={(e: any) => setState({ ...state, ssn: e.target.value })}
            ></EffektInput>

            <EffektButton onClick={add}>
                Create <Plus size={16} />
            </EffektButton>
        </NewTaxUnitModalWrapper>
    );
};
