import React from 'react';
import { connect } from 'react-redux';

import { SelectorWrapper, DonorDialog, Controls } from './DonorSelectionDialog.style';

import { hideDonorSelectionComponent, clearSelectedDonor } from './donor-selection.actions';
import { AppState } from '../../../../models/state';
import { EffektButton, EffektSecondaryButton } from '../../../style/elements/button.style';
import { DonorSelectionComponent } from './DonorSelection';

class DonorSelectionDialogComponent extends React.Component<IStateProps & IDispatchProps> {
  abort = () => {
    this.props.clearSelectedDonor();
    this.props.hideDonorSelectionComponent();
  };

  confirm = () => {
    //State is already set in component
    this.props.hideDonorSelectionComponent();
  };

  render() {
    return (
      <SelectorWrapper visible={this.props.visible}>
        <DonorDialog>
          <DonorSelectionComponent></DonorSelectionComponent>
          {/* Controls */}
          <Controls>
            <EffektSecondaryButton onClick={this.abort}>Avbryt</EffektSecondaryButton>
            <EffektButton onClick={this.confirm}>Confirm</EffektButton>
          </Controls>
        </DonorDialog>
      </SelectorWrapper>
    );
  }
}

interface IStateProps {
  visible: boolean;
}
const mapStateToProps = (state: AppState): IStateProps => {
  return {
    visible: state.donorSelector.visible,
  };
};

interface IDispatchProps {
  hideDonorSelectionComponent: Function;
  clearSelectedDonor: Function;
}
const mapDispatchToProps: IDispatchProps = {
  hideDonorSelectionComponent,
  clearSelectedDonor,
};

export default connect(mapStateToProps, mapDispatchToProps)(DonorSelectionDialogComponent);
