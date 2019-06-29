import React from 'react';
import { AppState } from '../../../../models/state';
import { fetchDonorRequest } from './home.actions'
import { connect } from 'react-redux';

class HomeComponent extends React.Component<IStateProps & IDispatchProps> {
    fetchDonor = () => {
        this.props.fetchDonorRequest()
    }

    render() {
        return (
            <div className="home" style={{display: 'inline-block', maxWidth: "calc(100vw - 350px)"}}>
                <button onClick={this.fetchDonor}>Fetch donor</button>

                <div style={{
                    borderRadius: 10,
                    background: 'rgba(255,255,255,.9)',
                    color: 'black',
                    padding: 20,
                    wordBreak: 'break-all',
                    maxWidth: '600px'
                }}>
                    {JSON.stringify(this.props.selectedDonor)}
                </div>
            </div>
        )
    }
}

interface IStateProps {
    selectedDonor: any
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        selectedDonor: state.selectedDonor
    }
}

interface IDispatchProps {
    fetchDonorRequest: Function,
}
const mapDispatchToProps: IDispatchProps = {
    fetchDonorRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);