import { MainHeader } from "../../shared/elements/headers.style";
import React from "react";
import { Page } from "../../shared/elements/page.style";
import { DonorSelectionComponent } from "../../shared/donors/selection/donor-selection.component";

export const DonorsPageComponent:React.FunctionComponent = () => {
    return (
        <Page>
            <MainHeader>Donors</MainHeader>
            <DonorSelectionComponent></DonorSelectionComponent>
        </Page>
    )
}