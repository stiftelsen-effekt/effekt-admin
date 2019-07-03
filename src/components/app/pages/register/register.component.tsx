import { MainHeader } from "../../style/elements/headers.style";
import { AppState } from "../../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { Page } from "../../style/elements/page.style";

class RegisterComponent extends React.Component<IStateProps & IDispatchProps> {
    render() {
        return (
            <Page>
                <MainHeader>Register</MainHeader>
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
}
const mapDispatchToProps: IDispatchProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);