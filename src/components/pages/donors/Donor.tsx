import { MainHeader } from "../../style/elements/headers.style";
import React, { useEffect, useState } from "react";
import { Page } from "../../style/elements/page.style";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import { DonorKeyInfo } from "./donor/KeyInfo";
import { TotalDonationAmount } from "./donor/TotalDonationAmount";
import { DonationsList } from "../../modules/donations/list/DonationsList";
import {
  getDonorAction,
  getDonorAvtalegiroAgreementsAction,
  getDonorDistributionsAction,
  getDonorDonationsAction,
  getDonorVippsAgreementsAction,
  getDonorYearlyAggregatesAction,
  getDonorReferralAnswersAction,
  getDonorTaxUnitsAction,
  getDonorAutoGiroAgreementsAction,
  mergeDonorsAction,
} from "../../../store/donors/donor-page.actions";
import { DonorAggregateChart } from "./donor/AggregateChart";
import { ChartWrapper, OverviewLine } from "./Donor.style";
import { EffektTabs } from "../../modules/shared/tabs/EffektTabs";
import { EffektTabHeader } from "../../modules/shared/tabs/EffektTabHeader";
import { EffektTab } from "../../modules/shared/tabs/EffektTab";
import { VippsAgreementList } from "../../modules/vipps/agreementlist/VippsAgreementList";
import { DistributionsList } from "../../modules/distribution/list/DistributionsList";
import { useAuth0 } from "@auth0/auth0-react";
import { ReferralAnswerList } from "../../modules/donors/referral_answers/ReferralAnswerList";
import { TaxUnitList } from "../../modules/taxunits/list/TaxUnitsList";
import { AvtaleGiroList } from "../../modules/avtalegiro/agreementlist/AvtaleGiroList";
import { AutoGiroList } from "../../modules/autogiro/agreementlist/AutoGiroList";
import { EffektButton } from "../../style/elements/button.style";
import { EffektModal } from "../../style/elements/effekt-modal/effekt-modal.component.style";
import { showDonorSelectionComponent } from "../../../store/donors/donor-selection.actions";

export const DonorPage: React.FunctionComponent = () => {
  const { id } = useParams<"id">();
  const dispatch = useDispatch();
  const donorId = id ? parseInt(id) : NaN;
  const { getAccessTokenSilently } = useAuth0();

  const data = useSelector((state: AppState) => state.donorPage);

  const [mergeModalOpen, setMergeModalOpen] = useState<boolean>(false);
  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const donor = useSelector((state: AppState) => state.donorPage.donor);

  const navigate = useNavigate();

  const mergeDonorDestionationId = useSelector(
    (state: AppState) => state.donorPage.mergedDonorTargetId,
  );

  if (!id || Number.isNaN(donorId)) {
    return <Page>Loading...</Page>;
  }

  useEffect(() => {
    if (mergeDonorDestionationId) {
      navigate(`/donors/${mergeDonorDestionationId}`);
    }
  }, [mergeDonorDestionationId, navigate]);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(getDonorAction.started({ id: donorId, token }));
      dispatch(getDonorDonationsAction.started({ id: donorId, token }));
      dispatch(getDonorDistributionsAction.started({ id: donorId, token }));
      dispatch(getDonorAvtalegiroAgreementsAction.started({ id: donorId, token }));
      dispatch(getDonorAutoGiroAgreementsAction.started({ id: donorId, token }));
      dispatch(getDonorVippsAgreementsAction.started({ id: donorId, token }));
      dispatch(getDonorYearlyAggregatesAction.started({ id: donorId, token }));
      dispatch(getDonorReferralAnswersAction.started({ id: donorId, token }));
      dispatch(getDonorTaxUnitsAction.started({ id: donorId, token }));
    });
  }, [dispatch, donorId, getAccessTokenSilently]);

  let totalDonations = 0;
  let operationsDonations = 0;
  if (data.stats && data.stats.sumYearlyAggregates) {
    data.stats.sumYearlyAggregates.forEach((row) => {
      let amount = row.value ? row.value.toNumber() : 0;
      totalDonations += amount;
      if (row.abbriv === "Drift") operationsDonations += amount;
    });
  }

  return (
    <Page>
      <MainHeader>Donor {donorId}</MainHeader>

      <EffektButton onClick={() => setMergeModalOpen(true)}>Merge donor</EffektButton>

      <OverviewLine>
        {data.donor && <DonorKeyInfo donor={data.donor} />}
        <TotalDonationAmount
          totalDonationAmount={totalDonations}
          operationsDonationAmount={operationsDonations}
        />
      </OverviewLine>

      <ChartWrapper>
        <DonorAggregateChart stats={data.stats} />
      </ChartWrapper>

      <EffektTabs>
        <div>
          <EffektTabHeader
            label="Donations"
            counter={data.donations ? data.donations.length : "..."}
          />
          <EffektTabHeader
            label="Distributions"
            counter={data.distributions ? data.distributions.length : "..."}
          />
          <EffektTabHeader
            label="AvtaleGiro"
            counter={data.avtalegiroAgreements ? data.avtalegiroAgreements.length : "..."}
          />
          <EffektTabHeader
            label="AutoGiro"
            counter={data.autoGiroAgreements ? data.autoGiroAgreements.length : "..."}
          />
          <EffektTabHeader
            label="Vipps recurring"
            counter={data.vippsAgreements ? data.vippsAgreements.length : "..."}
          />
          <EffektTabHeader
            label="Tax units"
            counter={data.taxUnits ? data.taxUnits.length : "..."}
          />
          <EffektTabHeader
            label="Referrals"
            counter={data.referralAnswers ? data.referralAnswers.length : "..."}
          />
        </div>
        <div>
          <EffektTab>
            <DonationsList donations={data.donations} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <DistributionsList
              distributions={data.distributions}
              defaultPageSize={10}
              hideEmail={true}
              hideName={true}
            />
          </EffektTab>
          <EffektTab>
            <AvtaleGiroList agreements={data.avtalegiroAgreements} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <AutoGiroList agreements={data.autoGiroAgreements} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <VippsAgreementList agreements={data.vippsAgreements} defaultPageSize={10} />
          </EffektTab>
          <EffektTab>
            <TaxUnitList taxUnits={data.taxUnits} donorId={donorId} />
          </EffektTab>
          <EffektTab>
            <ReferralAnswerList data={data.referralAnswers} />
          </EffektTab>
        </div>
      </EffektTabs>

      <EffektModal visible={mergeModalOpen}>
        <div style={{ display: "flex", flexDirection: "column", padding: "20px", gap: "10px" }}>
          <h2>Merge donor into</h2>
          <span>
            {selectedDonor ? `${selectedDonor.name} (id: ${selectedDonor.id})` : "Select donor"}
          </span>
          <EffektButton onClick={() => dispatch(showDonorSelectionComponent())}>
            Select destination donor
          </EffektButton>
          <hr />
          <EffektButton
            onClick={() => {
              if (!selectedDonor) {
                alert("Please select a donor first");
                return;
              }
              if (!donor) {
                alert("Donor has not been loaded");
                return;
              }
              // confirmation box
              if (
                window.confirm(
                  `Are you sure you want to merge ${donor.name} with id ${donor.id} INTO ${selectedDonor.name} with id ${selectedDonor.id}`,
                )
              ) {
                getAccessTokenSilently().then((token) => {
                  dispatch(
                    mergeDonorsAction.started({
                      originalDonorId: donor.id,
                      destinationDonorId: selectedDonor.id,
                      token,
                    }),
                  );
                  setMergeModalOpen(false);
                });
              }
            }}
          >
            Merge into
          </EffektButton>
          <EffektButton onClick={() => setMergeModalOpen(false)}>Cancel</EffektButton>
        </div>
      </EffektModal>
    </Page>
  );
};
