import { AppState } from "../../../../store/state";
import React, { ChangeEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import '../../../shared/elements/react-table/table.css'
import ReactTable from "react-table";
import { IDonor } from "../../../../types";
import { EffektInput } from "../../../shared/elements/input.style";
import { orange50 } from "../../../../config/colors";
import { shortDate } from "../../../../util/formatting";
import { PlusSquare } from "react-feather";
import { EffektButton } from "../../../shared/elements/button.style";
import { EffektModal } from "../../../shared/elements/effekt-modal/effekt-modal.component.style";
import { CreateDonor } from "../create/create-donor.component";
import { searchDonorAction, setSelectedDonor } from "../../../../store/donor/select/donor-selection.actions";

interface IDonorTableState {
    sorted: Array<any>,
    page: number,
    pageSize: number,
    expanded: any,
    resized: any,
    filtered: any,
    selected: any
}

export const DonorSelectionComponent: React.FunctionComponent = (props) => {
    const getDefaultState = (): IDonorTableState => {
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
    
    const [state, setState] = useState<IDonorTableState>(getDefaultState())
    const dispatch = useDispatch()
    const searchResult = useSelector((state: AppState) => state.donorSelector.searchResult)

    if (!searchResult) dispatch(searchDonorAction.started(""))

    const search = (event: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            selected: null
        })
        dispatch(searchDonorAction.started(event.target.value))
    }

    const columnDefinitions = [
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
            id: "registered",
            Header: "registered",
            accessor: (donor: IDonor) => shortDate(donor.registered)
        }
    ]

    const rowClick = (rowInfo: any) => {
        console.log(rowInfo)
        setState({
            ...state,
            selected: rowInfo.index
        })
        dispatch(setSelectedDonor(rowInfo.original))
    }

    const rowDoubleClick = (donorID: number) => {
        console.log("GOTO DONOR:", donorID);
    }

    const rowStyle = (rowIndex: number, selectedIndex: number) => {
        console.log(rowIndex, selectedIndex)
        return {
            background: rowIndex === selectedIndex ? orange50 : '',
            color: rowIndex === selectedIndex ? 'white' : ''
        }
    }

    const trProps = (tableState: any, rowInfo: any) => {
        if (rowInfo && rowInfo.row) {
            return {
                onClick: (e: React.MouseEvent) => rowClick(rowInfo),
                onDoubleClick: (e: any) => rowDoubleClick(rowInfo.original.id),
                style: rowStyle(rowInfo.index, state.selected)
            }
        } else{
            return {}
        }
    }

    const [showCreate, setShowCreate] = useState<boolean>(false)

    return (
        <div>
            <div style={{display: 'flex', marginBottom: '20px'}}>
                <EffektInput type="text" onChange={search} placeholder="søk" style={{ flexGrow: 1, marginRight: 18 }}></EffektInput>
                <EffektButton onClick={() => setShowCreate(true)}><span>Create &nbsp;</span> <PlusSquare color={"white"} size={18} style={{verticalAlign: "middle"}}/></EffektButton>
            </div>
            
            <EffektModal
                visible={showCreate}
                effect="fadeInUp"
                onClickAway={() => setShowCreate(false)}>
                <CreateDonor onSubmit={() => setShowCreate(false)}></CreateDonor>
            </EffektModal>
            <ReactTable
                data={searchResult}
                columns={columnDefinitions}
                    defaultPageSize={10}
                    onSortedChange={sorted => setState({ ...state, sorted })}
                    onPageChange={page => setState({ ...state, page })}
                    onPageSizeChange={(pageSize, page) => setState({ ...state, page, pageSize })}
                    onExpandedChange={expanded => setState({ ...state, expanded })}
                    onResizedChange={resized => setState({ ...state, resized })}
                    onFilteredChange={filtered => setState({ ...state, filtered })}
                    getTrProps={trProps}
            ></ReactTable>
        </div>
    )
}