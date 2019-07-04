import { AppState } from "../../../../models/state";
import React from "react";

import { connect } from "react-redux";

import '../../style/elements/react-table/table.css'
import ReactTable from "react-table";

const makeDefaultState = () => ({
    sorted: [],
    page: 0,
    pageSize: 10,
    expanded: {},
    resized: [],
    filtered: []
  });

class DonorSelectorComponent extends React.Component<IStateProps & IDispatchProps> {
    constructor(props: IStateProps & IDispatchProps) {
        super(props);
        this.state = makeDefaultState();
        this.resetState = this.resetState.bind(this);
    }

    resetState() {
        this.setState(makeDefaultState());
    }

    render() {
        return (
            <div>
                <span>Searchbox</span>
                <ReactTable
                    data={mockData}
                    columns={[
                        {
                            Header: "ID",
                            accessor: "ID"
                        },
                        {
                            Header: "First Name",
                            accessor: "name"
                        },
                        {
                            Header: "Email",
                            accessor: "email"
                        },
                        {
                            Header: "Donations",
                            accessor: "donations"
                        }
                      ]}
                      //pivotBy={["lastName"]}
                      //filterable
                      defaultPageSize={10}
                      className="-striped -highlight"
                      // Controlled props
                      //sorted={this.state.sorted}
                      //page={this.state.page}
                      //pageSize={this.state.pageSize}
                      //expanded={this.state.expanded}
                      //resized={this.state.resized}
                      //filtered={this.state.filtered}
                      // Callbacks
                      onSortedChange={sorted => this.setState({ sorted })}
                      onPageChange={page => this.setState({ page })}
                      onPageSizeChange={(pageSize, page) =>
                        this.setState({ page, pageSize })}
                      onExpandedChange={expanded => this.setState({ expanded })}
                      onResizedChange={resized => this.setState({ resized })}
                      onFilteredChange={filtered => this.setState({ filtered })}
                ></ReactTable>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DonorSelectorComponent);

const mockData = [
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
    {
        ID: Math.round(Math.random()*40),
        name: 'SomeName',
        email: 'kkk@kkk.no',
        donations: Math.round(Math.random()*500),
        donatoinSum:  Math.round(Math.random()*40000)
    },
]