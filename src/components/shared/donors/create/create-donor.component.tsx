import React from 'react'
import { useState } from "react";
import { EffektInput } from "../../../shared/elements/input.style";
import { EffektButton } from "../../../shared/elements/button.style";
import { useDispatch } from 'react-redux';
import { createDonorAction } from '../../../../store/donor/create/create-donor.actions';
import { CreateDonorWrapper } from './create-donor.component.style';

interface IState {
    email: string,
    name: string
}

interface IProps {
    onSubmit(): void
}

export const CreateDonor: React.FunctionComponent<IProps> = ({onSubmit}) => {
    const [state, setState] = useState<IState>({
        email: '',
        name: ''
    })

    const dispatch = useDispatch()

    const submit = () => {
        dispatch(createDonorAction.started({ email: state.email, name: state.name }))
        onSubmit()
    }

    return (
        <CreateDonorWrapper>
            <EffektInput value={state.email} placeholder="email" onChange={(e: any) => setState({...state, email: e.target.value})}></EffektInput>
            <EffektInput value={state.name} placeholder="navn" onKeyDown={(e) => e.key === 'Enter' && submit()} onChange={(e: any) => setState({...state, name: e.target.value})}></EffektInput>
            <EffektButton onClick={submit}>Create</EffektButton>
        </CreateDonorWrapper>
    ) 
}