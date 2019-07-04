import React from 'react';
import { AppState } from '../../../../models/state';
import { fetchDonorRequest } from './home.actions'
import { connect } from 'react-redux';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { EffektButton } from '../../style/elements/button.style';

class HomeComponent extends React.Component<IStateProps & IDispatchProps> {
    fetchDonor = () => {
        this.props.fetchDonorRequest()
    }

    render() {
        return (
            <Page>
                <MainHeader>Home</MainHeader>
                <EffektButton onClick={this.fetchDonor}>Fetch donor</EffektButton>

                <div style={{
                    borderRadius: 10,
                    background: 'rgba(255,255,255,.9)',
                    color: 'black',
                    padding: 20,
                    wordBreak: 'break-all'
                }}>
                    {JSON.stringify(this.props.selectedDonor)}
                </div>
            </Page>
        )
    }
}

interface IStateProps {
    selectedDonor: any
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        selectedDonor: state.home.selectedDonor
    }
}

interface IDispatchProps {
    fetchDonorRequest: Function,
}
const mapDispatchToProps: IDispatchProps = {
    fetchDonorRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);