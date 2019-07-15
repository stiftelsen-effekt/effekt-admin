import React, { useState } from 'react'
import { HiddenFileInput } from './fileinput.style';

interface IState {
    filename: string
}

interface IProps {
    id: string
}

export const EffektFileInput: React.FunctionComponent<IProps> = (props: IProps) => {
    const [state, setState] = useState<IState>({filename: ""})

    const selectedFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null && event.target.files.length > 0) {
            setState({
                ...state,
                filename: event.target.files[0].name
            })
        } else {
            setState({
                ...state,
                filename: ""
            })
        }
    }

    return (
        <div>
            <HiddenFileInput 
                {...props} 
                type="file" 
                onChange={selectedFileChanged}
                placeholder="Drag file here or click"/>
            <label htmlFor={props.id}>Select</label>
            {state.filename}
        </div>
    )
    
}