/* eslint-disable no-restricted-globals */
import Decimal from "decimal.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import Validator from "validator";
import { API_URL } from "../../../../config/config";
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

interface Props {
	KID?: string;
}

export const DistributionInput: React.FC<Props> = ({KID}) => {
	const [organizations, setOrganizations] = useState<Organization[]>()
	const [shares, setShares] = useState<IDistributionShare[]>([])
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
		setShares(newShares)
	}, [organizations])

	useEffect(() => {
		if (shares) {
            let sum = new Decimal(0)
            shares.forEach(org => {
                sum = sum.plus(org.share)
            })
            setSumPercentage(parseInt(sum.toFixed(0)))
        }
	}, [shares])

	if (!organizations) return <div>Failed fetching organizations</div>

	return (
		<Wrapper>
			<div>
				{shares && shares.map((share: IDistributionShare) => (
					<div key={share.organizationId}>
						<TextInput
							label={organizations.filter((org) => org.id === share.organizationId)[0].name}
							key={share.organizationId}
							type="tel"
							inputMode="numeric"
							placeholder="0"
							value={share.share.toString()}
							onChange={(e: { target: { value: string; }; }) => {
								const newShares: IDistributionShare[] = [...shares]
                                // Index of changed organization
								const index = newShares.map((s) => {
									return s.organizationId
								}).indexOf(share.organizationId);
								
								newShares[index].share = Validator.isInt(e.target.value)
									? new Decimal(e.target.value)
									: new Decimal(0);
								setShares(newShares)

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
