import { MainHeader } from "../../style/elements/headers.style";
import { AppState } from "../../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { Page } from "../../style/elements/page.style";
import { showDonorSelectionComponent } from "../../modules/donors/donor-selection.actions";
import { EffektButton } from "../../style/elements/button.style";

class RegisterComponent extends React.Component<IStateProps & IDispatchProps> {
    searchForDonor = () => { this.props.showDonorSelectionComponent() }

    render() {
        return (
            <Page>
                <MainHeader>Register donatoins</MainHeader>
                {/* 
                <SubHeader>Upload report</SubHeader>
                <SubHeader>Process single donation</SubHeader>
                */}
                <EffektButton onClick={this.searchForDonor}>Finn donor</EffektButton>
            </Page>
        )
    }
}

interface IStateProps {
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
    }
}

interface IDispatchProps {
    showDonorSelectionComponent: Function
}
const mapDispatchToProps: IDispatchProps = {
    showDonorSelectionComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);