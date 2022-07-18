import actionCreatorFactory from 'typescript-fsa';
import { ReportProcessingState } from '../../models/state';
import { IDistributionShare } from '../../models/types';
const actionCreator = actionCreatorFactory();

export interface IRegisterCampaignActionParams {
  campaign: {
    id: string;
    shares: Array<IDistributionShare>;
  };
  token: string;
}

export interface IProcessDonationsActionParams {
  metaOwnerID: number;
  token: string;
}

export const registerCampaignAction = actionCreator.async<
  IRegisterCampaignActionParams,
  undefined,
  Error
>('REGISTER_FB_CAMPAIGN');

export const processDonationsAction = actionCreator.async<
  IProcessDonationsActionParams,
  ReportProcessingState,
  Error
>('PROCESS_FB_DONATIONS');
