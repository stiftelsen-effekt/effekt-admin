import React from "react";
import { EffektButton, EffektSecondaryButton } from "../../../style/elements/button.style";

interface IProps {
    onInsert(): void,
    onIgnore?(): void
}

export const DonationControls: React.FunctionComponent<IProps> = (props: IProps) => {
    let ignoreButton;
    if (props.onIgnore !== undefined) {
        ignoreButton = <EffektSecondaryButton onClick={props.onIgnore} style={{ marginRight: '20px' }}>Ignore</EffektSecondaryButton>
    }

    return (
        <React.Fragment>
            {ignoreButton}
            <EffektButton onClick={props.onInsert}>Insert</EffektButton>
        </React.Fragment>
    )
}