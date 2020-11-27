import React, { useState } from 'react'
import { FilterHeader, FilterWrapper, FilterGroup, FilterGroupHeader, FilterInput } from '../../../elements/filters.component.style';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../../../store/state';
import { FilterOpenButton } from '../../../elements/filter-buttons/filter-open-button.component';
import { fetchDistributionsAction, setDistributionFilterDonor, setDistributionFilterKid } from '../../../../../store/distributions/list/distribution-list.actions';

export const DistributionsFiltersComponent: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    const KID = useSelector((state: AppState) => state.distributions.filter.KID)
    const donor = useSelector((state: AppState) => state.distributions.filter.donor)

    const [filterIsOpen, setFilterIsOpen] = useState<boolean>(false)

    return (
        <FilterWrapper isOpen={filterIsOpen}>
            <FilterOpenButton
                isOpen={filterIsOpen}
                onClick={() => setFilterIsOpen(!filterIsOpen)}></FilterOpenButton>
            <FilterHeader>Filters</FilterHeader>
            
            <FilterGroup>
                <FilterGroupHeader>KID</FilterGroupHeader>
                <FilterInput 
                    placeholder="Fuzzysearch" 
                    style={{width: '100%'}} 
                    value={KID}
                    onChange={(e) => {
                        dispatch(setDistributionFilterKid(e.target.value))
                        dispatch(fetchDistributionsAction.started(undefined))
                    }}></FilterInput>
            </FilterGroup>

            <FilterGroup>
                <FilterGroupHeader>Donor</FilterGroupHeader>
                <FilterInput 
                    placeholder="Fuzzysearch" 
                    style={{width: '100%'}} 
                    value={donor}
                    onChange={(e) => { 
                        dispatch(setDistributionFilterDonor(e.target.value))
                        dispatch(fetchDistributionsAction.started(undefined))
                    }}></FilterInput>
            </FilterGroup>
        </FilterWrapper>
    )
}