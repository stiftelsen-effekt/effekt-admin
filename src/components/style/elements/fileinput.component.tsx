import React, { useState } from 'react'
import { HiddenFileInput, FileInputLabel } from './fileinput.style';

interface IState {
    filename: string | null,
    file: File | null
}

interface IProps {
    id: string,
    onChange(file: File | null): void
}

export const EffektFileInput: React.FunctionComponent<IProps> = (props: IProps) => {
    const getDefaultState = (): IState => {
        return {
            filename: null,
            file: null
        }
    }

    const [state, setState] = useState<IState>(getDefaultState())

    const selectedFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null && event.target.files.length > 0) {
            setState({
                ...state,
                filename: event.target.files[0].name,
                file: event.target.files[0]
            })

            props.onChange(event.target.files[0])
        } else {
            setState(getDefaultState())
            props.onChange(null)
        }
    }

    let label;
    if (state.filename) {
        label = <FileInputLabel htmlFor={props.id}>{state.filename}</FileInputLabel>
    } else {
        label = <FileInputLabel htmlFor={props.id}>Drag file here or click</FileInputLabel>
    }

    return (
        <div>
            <HiddenFileInput 
                {...props} 
                type="file" 
                onChange={selectedFileChanged} />
            {label}
        </div>
    )
    
}