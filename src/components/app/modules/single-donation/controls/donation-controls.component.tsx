import React, { useState } from "react";
import { EffektButton, EffektSecondaryButton } from "../../../style/elements/button.style";
import { EffektCheck } from "../../../style/elements/effekt-check/effekt-check.component";

interface IProps {
    onInsert(reciept: boolean): void,
    onIgnore?(): void
}

export const DonationControls: React.FunctionComponent<IProps> = (props: IProps) => {
    let ignoreButton;
    if (props.onIgnore !== undefined) {
        ignoreButton = <EffektSecondaryButton onClick={props.onIgnore} style={{ marginRight: '20px' }}>Ignore</EffektSecondaryButton>
    }

    const [reciept, setReciept] = useState<boolean>(false)

    return (
        <React.Fragment>
            {ignoreButton}
            <EffektCheck 
                label={"Kvittering"}
                checked={reciept}
                onChange={(checked) => { setReciept(checked) }}
                azure={false}></EffektCheck>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <EffektButton onClick={() => props.onInsert(reciept)}>Insert</EffektButton>
        </React.Fragment>
    )
}