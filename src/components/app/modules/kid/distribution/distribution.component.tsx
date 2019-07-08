import React from 'react'
import { IOrganization } from '../../../../../models/dbtypes';
import { EffektText } from '../../../style/elements/text.style';

interface IProperties {
    organizations: Array<IOrganization> | undefined
}

export const KIDDistribution: React.FunctionComponent<IProperties> = (props: IProperties) => {
    if (props.organizations) {
        return (
            <div>
                {props.organizations.map((organization) => (
                    <div>
                        <span>{organization.name}</span>
                        <EffektText type="number"></EffektText>
                    </div>
                ))}
            </div>
        )
    } else {
        return (<div>Loading...</div>)
    }
}