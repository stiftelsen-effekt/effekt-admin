import actionCreatorFactory from 'typescript-fsa';
import { IAvtaleGiro, IDistribution, IDistributionSearchResultItem, IDistributionShare, IDonation, IDonor, IVippsAgreement } from '../../models/types';

const actionCreator = actionCreatorFactory();

export const getDonorAction = actionCreator.async<number, IDonor, Error>(
  'FETCH_DONOR'
);
export const getDonorDonationsAction = actionCreator.async<number, Array<IDonation>, Error>(
  'FETCH_DONOR_DONATIONS'
);
export const getDonorDistributionsAction = actionCreator.async<number, Array<IDistributionSearchResultItem>, Error>(
  'FETCH_DONOR_DISTRIBUTIONS'
);
export const getDonorAvtalegiroAgreementsAction = actionCreator.async<number, Array<IAvtaleGiro>, Error>(
  'FETCH_DONOR_AVTALEGIRO_AGREEMENTS'
);
export const getDonorVippsAgreementsAction = actionCreator.async<number, Array<IVippsAgreement>, Error>(
  'FETCH_DONOR_VIPPS_AGREEMENTS'
);
export const getDonorYearlyAggregatesAction = actionCreator.async<number, Array<IDistributionShare & { year: number }>, Error>(
  'FETCH_DONOR_YEARLY_AGGREGATES'
);