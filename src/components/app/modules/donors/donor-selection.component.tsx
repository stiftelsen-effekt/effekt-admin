import { AppState } from "../../../../models/state";
import React, { ChangeEvent } from "react";

import { connect } from "react-redux";

import '../../style/elements/react-table/table.css'
import ReactTable from "react-table";
import { searchDonorsRequest, setSelectedDonor, clearSelectedDonor } from "./donor-selection.actions";
import { IDonor } from "../../../../models/dbtypes";
import { EffektText } from "../../style/elements/text.style";
import { orange50 } from "../../style/colors";

interface IDonorTableState {
    sorted: Array<any>,
    page: number,
    pageSize: number,
    expanded: any,
    resized: any,
    filtered: any,
    selected: any
}

class DonorSelectorComponent extends React.Component<IStateProps & IDispatchProps, IDonorTableState> {
    constructor(props: IStateProps & IDispatchProps) {
        super(props);
        this.state = this.defaultState;
        this.resetState = this.resetState.bind(this);
    }

    get defaultState(): IDonorTableState {
        return {
            sorted: [],
            page: 0,
            pageSize: 10,
            expanded: {},
            resized: [],
            filtered: [],
            selected: null
        }
    }

    search = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            selected: null
        })
        this.props.clearSelectedDonor()
        this.props.searchDonorsRequest(event.target.value)
    }

    resetState() {
        this.setState(this.defaultState);
    }

    componentDidMount() {
        //Gets first 100 results
        this.props.searchDonorsRequest("");
    }

    columnDefinitions = [
        {
            Header: "ID",
            accessor: "id"
        },
        {
            Header: "name",
            accessor: "name"
        },
        {
            Header: "email",
            accessor: "email"
        },
        {
            Header: "registered",
            accessor: "registered"
        }
    ]

    trProps = (state: any, rowInfo: any) => {
        if (rowInfo && rowInfo.row) {
            return {
                onClick: (e: React.MouseEvent) => this.rowClick(rowInfo),
                onDoubleClick: (e: any) => this.rowDoubleClick(rowInfo.original.id),
                style: this.rowStyle(rowInfo.index, this.state.selected)
            }
        } else{
            return {}
        }
    }

    rowClick = (rowInfo: any) => {
        this.props.setSelectedDonor(rowInfo.original)
        this.setState({
            selected: rowInfo.index
        })
    }

    rowDoubleClick = (donorID: number) => {
        console.log("GOTO DONOR:", donorID);
    }

    rowStyle = (rowIndex: number, selectedIndex: number) => {
        return {
            background: rowIndex === selectedIndex ? orange50 : '',
            color: rowIndex === selectedIndex ? 'white' : ''
        }
    }

    render() {
        return (
            <div>
                <EffektText type="text" onChange={this.search} placeholder="søk" style={{ width: '100%', marginBottom: '20px' }}></EffektText>
                <ReactTable
                    data={this.props.data}
                    columns={this.columnDefinitions}
                      defaultPageSize={10}
                      onSortedChange={sorted => this.setState({ sorted })}
                      onPageChange={page => this.setState({ page })}
                      onPageSizeChange={(pageSize, page) => this.setState({ page, pageSize })}
                      onExpandedChange={expanded => this.setState({ expanded })}
                      onResizedChange={resized => this.setState({ resized })}
                      onFilteredChange={filtered => this.setState({ filtered })}
                      getTrProps={this.trProps}
                ></ReactTable>
            </div>
        )
    }
}

interface IStateProps {
    data: Array<IDonor>
}
const mapStateToProps = (state: AppState): IStateProps => {
    return {
        data: state.donorSelector.searchResult
    }
}

interface IDispatchProps {
    searchDonorsRequest: Function,
    setSelectedDonor: Function,
    clearSelectedDonor: Function
}
const mapDispatchToProps: IDispatchProps = {
    searchDonorsRequest,
    setSelectedDonor,
    clearSelectedDonor
}

export default connect(mapStateToProps, mapDispatchToProps)(DonorSelectorComponent);