import { MainHeader } from "../style/elements/headers.style";
import { AppState } from "../../models/state";
import React from "react";
import { connect } from "react-redux";

class TemplateComponent extends React.Component<IStateProps & IDispatchProps> {
    render() {
        return (
            <MainHeader>Template</MainHeader>
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);