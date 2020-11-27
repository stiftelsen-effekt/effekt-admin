import { MainHeader, SubHeader } from "../../shared/elements/headers.style";
import React from "react";
import { Page } from "../../shared/elements/page.style";
import { SingleDonation } from "../../shared/single-donation/single-donation.component";
import { ReportUpload } from "../../shared/report-upload/report-upload.component";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../store/state";
import { fetchActiveOrganizationsAction } from "../../../store/organizations/organizations.action";
import { RegisterRecieptComponent } from "../../shared/donations/reciept/reciept.component";

export const RegisterComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    
    const organizations = useSelector((state: AppState) => state.organizations.active)
    if (!organizations) {
        dispatch(fetchActiveOrganizationsAction.started(undefined))
        return (<div>Loading organizations</div>)
    }

    return ( 
        <Page>
            <MainHeader>Register donations</MainHeader>

            <SubHeader>Upload report</SubHeader>
            <ReportUpload></ReportUpload>

            <SubHeader>Process single donation</SubHeader>
            <SingleDonation organizations={organizations}></SingleDonation>

            <SubHeader>Resend reciept</SubHeader>
            <RegisterRecieptComponent></RegisterRecieptComponent>
        </Page>
    )
}