import { MainHeader, SubHeader } from "../../style/elements/headers.style";
import React from "react";
import { Page } from "../../style/elements/page.style";
import { SingleDonation } from "../../modules/single-donation/single-donation.component";

class RegisterComponent extends React.Component {
    render() {
        return (
            <Page>
                <MainHeader>Register donations</MainHeader>

                <SubHeader>Upload report</SubHeader>

                <SubHeader>Process single donation</SubHeader>
                <SingleDonation></SingleDonation>
            </Page>
        )
    }
}

export default RegisterComponent;