/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Validator from "validator";
import { API_URL } from "../../../../../config/config";
import { useDispatch } from 'react-redux';
import { updateAvtaleGiroDistributionAction } from "../../../../../store/avtalegiro/avtalegiro.actions";
import { TextInput } from "../../../../style/elements/TextInput/TextInput";
import { RedFont } from "./ShareSelection.style";

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

export interface Share {
	organizationId: number;
	share: number;
}

interface Split {
	ID: number;
	full_name: string;
    percentage_share: string;
}

interface Props {
	KID: string;
}

export const SharesSelection: React.FC<Props> = ({KID}) => {
	const [organizations, setOrganizations] = useState<Organization[]>()
	const [shares, setShares] = useState<Share[]>([])
	const [sumPercentage, setSumPercentage] = useState<number>()
	const [loading, setLoading] = useState<boolean>(false)
	const [splits, setSplits] = useState<Split[]>()
	const dispatch = useDispatch()

	// Temporary: replace with saga
	useEffect(() => {
        if (KID) {
            fetch(`${API_URL}/distributions/${KID}/unauthorized`)
                .then(res => res.json())
                .then((json: Split[]) => {
                    setSplits(json)
                })
        }
	}, [KID])

	// Temporary: replace with saga
	useEffect(() => {
		fetch(`${API_URL}/organizations/active`)
			.then(res => res.json())
			.then((json: OrganizationResponse) => {
				setOrganizations(json.content)
			})
	}, [])

	useEffect(() => {
		let newShares: Share[] = []
		organizations && organizations.forEach(org => {
			newShares.push({organizationId: org.id, share: 0})
			splits && splits.forEach(split => {
				if (split.ID === org.id) {
					// Remove duplicate organization
					newShares.splice(newShares.indexOf({organizationId: org.id, share: 0}), 1)
					// Add organization with share from current distribution
					newShares.push({organizationId: org.id, share: parseInt(split.percentage_share)})
				}
			})
		})
		setShares(newShares)
	}, [organizations, splits])

	useEffect(() => {
		if (shares) setSumPercentage(shares.reduce((acc, curr) => acc + curr.share, 0))
	}, [shares])

	if (loading) return <p>Loading...</p>
	if (!organizations) return <div>Failed fetching organizations</div>

	return (
		<Wrapper>
			<div>
				{shares && shares.map((share: Share) => (
					<div key={share.organizationId}>
						<TextInput
							label={organizations.filter((org) => org.id === share.organizationId)[0].name}
							tooltipText={
								organizations.filter((org) => org.id === share.organizationId)[0].shortDesc
							}
							key={share.organizationId}
							type="tel"
							inputMode="numeric"
							placeholder="0"
							value={share.share.toString()}
							onChange={(e: { target: { value: string; }; }) => {
								const newShares = [...shares]
								const index = newShares.map((s) => {
									return s.organizationId
								}).indexOf(share.organizationId);
								
								newShares[index].share = Validator.isInt(e.target.value)
									? parseInt(e.target.value)
									: 0;
								setShares(newShares)
							}}
							denomination="%"
							selectOnClick
						/>
					</div>
				))}
			</div>
			{sumPercentage === 100 ? null :<RedFont>{`Du har fordelt ${sumPercentage} av 100 prosent`}</RedFont>}
			<div>
				<button onClick={async () => {
					if (sumPercentage === 100) {
						if(confirm(`Press OK to set new AvtaleGiro distribution`)) {
							setLoading(true)
							const filteredShares = shares.filter(share => share.share > 0)
							dispatch(updateAvtaleGiroDistributionAction.started({KID, distribution: filteredShares}))
							location.reload()
						}
					}
				}}>
					Set new distribution
				</button> 
            </div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-top: 10px;
	width: 400px;
`
