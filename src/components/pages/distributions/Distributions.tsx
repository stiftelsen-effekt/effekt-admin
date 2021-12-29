import React from 'react';
import { Page } from '../../style/elements/page.style';
import { MainHeader } from '../../style/elements/headers.style';
import { DistributionsList } from '../../modules/distribution/list/DistributionsList';
import { DistributionListWrapper } from '../../modules/distribution/list/DistributionsList.style';
import { DistributionsFiltersComponent } from '../../modules/distribution/list/filters/DistributionsFilter';
import { useSelector } from 'react-redux';
import { AppState } from '../../../models/state';

export const DistributionsPageComponent: React.FunctionComponent = () => {
  const distributions = useSelector((state: AppState) => state.distributions.searchResult)

  return (
    <Page>
      <MainHeader>Distributions</MainHeader>

      <DistributionListWrapper>
        <DistributionsList distributions={distributions} manual />
        <DistributionsFiltersComponent />
      </DistributionListWrapper>
    </Page>
  )
}
