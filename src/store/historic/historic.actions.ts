import actionCreatorFactory from 'typescript-fsa';
import { IHistoricDonation } from '../../models/types';
const actionCreator = actionCreatorFactory();

export interface IRegisterHistoricDonationParams {
    csvFile: File,
    metaOwnerID: number
}

export const registerHistoricDonationsAction = actionCreator.async<IRegisterHistoricDonationParams, {registeredDonations: Array<IHistoricDonation>, failedDonations: Array<IHistoricDonation>}, Error>('REGISTER_HISTORIC');