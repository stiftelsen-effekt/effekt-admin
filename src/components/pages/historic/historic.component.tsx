import { MainHeader, SubHeader, GreenBox } from "../../style/elements/headers.style";
import { DonationListWrapper } from "../../modules/donations/list/donations-list.component.style";
import { EffektButton } from "../../style/elements/button.style";
import ReactTable from "react-table";
import React, { useState } from "react";
import { Page } from "../../style/elements/page.style";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../models/state";
import { IHistoricDonation } from "../../../models/types";
import stringify from "csv-stringify/lib/sync";

interface IHistoricDonationsTableState {
    page: number,
    pageSize: number,
    sorted: Array<any>
}

// Hacky solution for "downloading" the successful or failed donations as CSV
// Can probably be done in a much more sensible way
const downloadCSV = (records: IHistoricDonation[], filename: string) => {
    const csvString = stringify(records, {header: true})
    let csvFile = new Blob([csvString], {type: "text/csv;charset=utf-8;"})
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(csvFile, filename)
    }
    else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(csvFile);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

export const HistoricDonationsComponent: React.FunctionComponent = () => {
    const getDefaultState = (): IHistoricDonationsTableState => {
        return {
            page: 0,
            pageSize: 10,
            sorted: [{id: "date", desc: true}]
        }
    }
    
    const [state, setState] = useState<IHistoricDonationsTableState>(getDefaultState())

    const dispatch = useDispatch()
    
    const registered = useSelector((state: AppState) => state.historic.registeredDonations)
    const failed = useSelector((state: AppState) => state.historic.failedDonations)
    const csvFile = useSelector((state: AppState) => state.historic.csvFile)
    const loading = useSelector((state: AppState) => state.historic.inProgress)

    const columnDefinitions = [
        {
            Header: "Name",
            accessor: "name",

        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Sum",
            accessor: "amount",
            width: 100
        },
        {
            Header: "Transaction cost",
            accessor: "transactionCost"
        },
        {
            Header: "Date",
            id: "date",
            accessor: "date"
        }
    ]
    
    return (
        <Page>
            <MainHeader>Historic donations registration</MainHeader>

            <GreenBox>
                {loading ? 
                "Working! Please be patient."
                : `${registered.length} donations registered, ${failed.length} failures`}
            </GreenBox>

            <div style={{ marginBottom: 20}}>
                <EffektButton onClick={() => { downloadCSV(registered, "registered_donations.csv") }} style={{ marginRight: 20 }}>Download registered donations</EffektButton>
                <EffektButton onClick={() => { downloadCSV(failed, "failed_donations.csv") }}>Download failed donations</EffektButton>
            </div>

            <SubHeader>Registered donations</SubHeader>
            <ReactTable
                data={registered}
                columns={columnDefinitions}
                loading={loading}
                defaultPageSize={10}
                onSortedChange={sorted => setState({ ...state, sorted })}
                onPageChange={page => setState({ ...state, page })}
                onPageSizeChange={(pageSize, page) => setState({ ...state, page, pageSize })}
            />

            <SubHeader>Failed donations</SubHeader>
            <ReactTable
                data={failed}
                columns={columnDefinitions}
                loading={loading}
                defaultPageSize={10}
                onSortedChange={sorted => setState({ ...state, sorted })}
                onPageChange={page => setState({ ...state, page })}
                onPageSizeChange={(pageSize, page) => setState({ ...state, page, pageSize })}
            />
        </Page>
    )
}