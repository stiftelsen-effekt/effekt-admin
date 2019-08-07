import { MainHeader } from "../../style/elements/headers.style";
import React from "react";
import { Page } from "../../style/elements/page.style";
import { DonorSelectionComponent } from "../../modules/donors/selection/donor-selection.component";

export const DonorsPageComponent:React.FunctionComponent = () => {
    return (
        <Page>
            <MainHeader>Donors</MainHeader>
            <DonorSelectionComponent></DonorSelectionComponent>
        </Page>
    )
}