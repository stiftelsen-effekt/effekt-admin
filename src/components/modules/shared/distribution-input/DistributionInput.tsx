/* eslint-disable no-restricted-globals */
import Decimal from "decimal.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import Validator from "validator";
import { API_URL } from "../../../../config/config";
import { AppState } from "../../../../models/state";
import { IDistributionShare } from "../../../../models/types";
import { setDistributionInput } from "../../../../store/distributions/distribution-input.actions";
import { RedFont } from "../../../pages/avtalegiro/AvtaleGiroAgreement/ShareSelection/ShareSelection.style";
import { TextInput } from "../../../style/elements/TextInput/TextInput";

export interface Organization {
	abbriv: string;
	name: string;
	id: number;
	infoUrl: string;
	shortDesc: string;
	standardShare: number;
}

export interface OrganizationResponse {
	content: Organization[];
}

export const DistributionInput: React.FC = () => {
	const [organizations, setOrganizations] = useState<Organization[]>()
	const distributionInput: IDistributionShare[] = useSelector((state: AppState) => state.distributions.distributionInput.distribution)
	const [sumPercentage, setSumPercentage] = useState<number>()
	const dispatch = useDispatch()

	// Temporary: replace with saga
	useEffect(() => {
		fetch(`${API_URL}/organizations/active`)
			.then(res => res.json())
			.then((json: OrganizationResponse) => {
				setOrganizations(json.content)
			})
	}, [])

	useEffect(() => {
		let newShares: IDistributionShare[] = []
		organizations && organizations.forEach(org => {
			newShares.push({organizationId: org.id, share: new Decimal(0)})
		})
	}, [organizations])

	useEffect(() => {
		if (distributionInput) {
            let sum = new Decimal(0)
            distributionInput.forEach((org: IDistributionShare) => {
                sum = sum.plus(org.share)
            })
            setSumPercentage(parseInt(sum.toFixed(0)))
        }
	}, [distributionInput])

	if (!organizations) return <div>Failed fetching organizations</div>

	return (
		<Wrapper>
			<div>
				{organizations.map(org => (
					<div key={org.id}>
						<TextInput
							label={org.name}
							key={org.id}
							type="tel"
							inputMode="numeric"
							placeholder="0"
							value={distributionInput.filter(dist => dist.organizationId === org.id).length === 1 ? 
								distributionInput.filter(dist => dist.organizationId === org.id)[0].share.toString() : ""
							}
							onChange={(e: { target: { value: string; }; }) => {
								let newShares: IDistributionShare[] = [...distributionInput]

								organizations.forEach(org => {
									if (newShares.filter(share => share.organizationId === org.id).length === 0) {
										newShares.push({organizationId: org.id, share: new Decimal(0)})
									}
								})
								
                                // Index of changed organization
								const index = newShares.map((s) => {
									return s.organizationId
								}).indexOf(org.id);
								
								newShares[index].share = Validator.isInt(e.target.value)
									? new Decimal(e.target.value)
									: new Decimal(0);
                                dispatch(setDistributionInput(newShares))
							}}
							denomination="%"
							selectOnClick
						/>
					</div>
				))}
			</div>
			{sumPercentage === 100 ? null :<RedFont>{`You have distributed ${sumPercentage} of 100 percent`}</RedFont>}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-top: 10px;
	width: 400px;
`
