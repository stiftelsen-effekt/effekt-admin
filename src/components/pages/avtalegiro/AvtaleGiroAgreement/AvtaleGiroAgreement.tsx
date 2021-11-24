/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { Page } from '../../../style/elements/page.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../models/state';
import { IAvtaleGiro } from '../../../../models/types';
import { DistributionGraphComponent } from '../../../modules/distribution/Graph';
import { ResourceHeader, ResourceSubHeader, SubHeader } from '../../../style/elements/headers.style';
import { fetchAvtaleGiroAction, updateAvtaleGiroAmountAction, updateAvtaleGiroPaymentDateAction, updateAvtaleGiroStatusAction } from '../../../../store/avtalegiro/avtalegiro.actions';
import { HorizontalPanel } from '../../donations/Donation.style';
import { AvtaleGiroKeyInfo } from './AvtaleGiroKeyInfo';

interface IParams {
    id: string
}

export const AvtaleGiroAgreement: React.FunctionComponent<RouteComponentProps<IParams>> = ({ match }: RouteComponentProps<IParams>) => {
    const [editMenuVisible, setEditMenuVisible] = useState<boolean>(false)
    const [newAmount, setNewAmount] = useState<number>(0)
    const [newPaymentDate, setNewPaymentDate] = useState<number>(0)
    const [newStatus, setNewStatus] = useState<number>(0)
    const avtaleGiroID = match.params.id
    const dispatch = useDispatch()

    const avtaleGiro: IAvtaleGiro | undefined = useSelector((state: AppState) => state.avtaleGiroAgreements.currentAgreement)
    
    useEffect(() => {
        dispatch(fetchAvtaleGiroAction.started({ id: avtaleGiroID }))
      }, [avtaleGiroID, dispatch]);

    if (avtaleGiro) {
        return (
            <Page>
                <ResourceHeader hasSubHeader={true}>AvtaleGiro {avtaleGiroID}</ResourceHeader>
                <ResourceSubHeader>KID {avtaleGiro.KID}</ResourceSubHeader>

                <SubHeader>Keyinfo</SubHeader>
                <HorizontalPanel>
                    <div style={{ width: '400px', height: '380px' }}>
                        <DistributionGraphComponent distribution={avtaleGiro.distribution}></DistributionGraphComponent>
                    </div>
                
                    <AvtaleGiroKeyInfo agreement={avtaleGiro}></AvtaleGiroKeyInfo>
                </HorizontalPanel>
                
                <button onClick={() => setEditMenuVisible(!editMenuVisible)}>
                    {editMenuVisible ? "Cancel editing" : "Edit agreement"}
                </button>
                {editMenuVisible && 
                    <div>
                        <div>
                            <label>Sum</label>
                            <br/>
                            <input defaultValue="0" type="number" onChange={(e) => setNewAmount(parseInt(e.currentTarget.value))}></input>
                            <button 
                                disabled={newAmount < 1}
                                onClick={() => {
                                    if (confirm(`Press OK to update amount to ${newAmount}`)) {
                                        dispatch(updateAvtaleGiroAmountAction.started({KID: avtaleGiro.KID, amount: newAmount*100}))
                                        location.reload()
                                    }
                                }}
                            >Set new sum</button>
                        </div>

                        <div>
                            <label>Status</label>
                            <br/>
                            <select name="status" id="status" onChange={(e) => setNewStatus(parseInt(e.currentTarget.value))}>
                                <option value="0">Inactive</option>
                                <option value="1">Active</option>
                            </select>
                            <button
                                onClick={() => {
                                    if (confirm(`Press OK to update status to ${newStatus === 0 ? "Inactive" : "Active"}`)) {
                                        dispatch(updateAvtaleGiroStatusAction.started({KID: avtaleGiro.KID, status: newStatus}))
                                        location.reload()
                                    }
                                }}
                            >Set new status</button>
                        </div>

                        <div>
                            <label>Charge day</label>
                            <br/>
                            <input defaultValue="0" type="number" onChange={(e) => setNewPaymentDate(parseInt(e.currentTarget.value))}></input>
                            <button 
                                disabled={newPaymentDate < 0 || newPaymentDate > 28} 
                                onClick={() => {
                                    if(confirm(`Press OK to update payment date to ${newPaymentDate}`)) {
                                        dispatch(updateAvtaleGiroPaymentDateAction.started({KID: avtaleGiro.KID, paymentDate: newPaymentDate}))
                                        location.reload()
                                    }
                                }}
                            >Set new charge day</button>
                        </div>

                        {/* <div>
                            <label>KID</label>
                            <br/>
                            <input type="text"></input>
                            <button>Set new KID</button>
                        </div> */}
                    </div>
                }
                <SubHeader>Meta</SubHeader>
                <NavLink to={`/avtalegiro/agreements`}>See all agreements</NavLink>
            </Page>
        )
    }
    else {
        return (<Page>Loading...</Page>)
    }
}