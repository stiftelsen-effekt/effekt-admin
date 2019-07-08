import { MainHeader, SubHeader } from "../../style/elements/headers.style";
import { AppState } from "../../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { Page } from "../../style/elements/page.style";
import { showDonorSelectionComponent } from "../../modules/donors/donor-selection.actions";
import { EffektButton } from "../../style/elements/button.style";
import KIDComponent from "../../modules/kid/kid.component";

class RegisterComponent extends React.Component {
    render() {
        return (
            <Page>
                <MainHeader>Register donations</MainHeader>
                <SubHeader>Upload report</SubHeader>
                <SubHeader>Process single donation</SubHeader>
                <KIDComponent></KIDComponent>
            </Page>
        )
    }
}

export default RegisterComponent;