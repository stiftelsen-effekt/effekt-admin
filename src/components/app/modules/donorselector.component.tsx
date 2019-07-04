import { MainHeader } from "../style/elements/headers.style";
import { AppState } from "../../../models/state";
import React from "react";
import { connect } from "react-redux";
import { SelectorWrapper, DonorSelectorDialog } from "./donorselector.component.style";

class DonorSelectorComponent extends React.Component<IStateProps & IDispatchProps> {
    render() {
        return (
            <SelectorWrapper visible={this.props.visible}>
                <DonorSelectorDialog>
                    <span>Select donor</span>
                </DonorSelectorDialog>
            </SelectorWrapper>
        )
    }
}

interface IStateProps {
    visible: boolean
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        visible: state.donorSelector.visible
    }
}

interface IDispatchProps {
}
const mapDispatchToProps: IDispatchProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorSelectorComponent);