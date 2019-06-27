import React from 'react';
import { AppState } from '../../../models/state';
import { fetchDonorRequest } from './home.actions'
import { connect } from 'react-redux';

class HomeComponent extends React.Component<IStateProps & IDispatchProps> {
    fetchDonor = () => {
        this.props.fetchDonorRequest()
    }

    render() {
        console.log(this.props)
        return (
            <div className="App">
                <header className="App-header">
                    <p>GiEffektivt admin panel is alive! Logged in</p>

                    <button onClick={this.fetchDonor}>Login</button>

                    <div style={{
                        borderRadius: 10,
                        background: 'rgba(255,255,255,.9)',
                        color: 'black',
                        padding: 20,
                        whiteSpace: 'pre-wrap'
                    }}>
                        {JSON.stringify(this.props.selectedDonor)}
                    </div>
                </header>
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