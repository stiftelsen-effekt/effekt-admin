import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { IVippsAgreement, IDistribution } from "../../../../models/types";
import {
  updateVippsAmountAction,
  updateVippsStatusAction,
  updateVippsChargeDayAction,
  updateVippsDistributionAction,
} from "../../../../store/vipps/vipps.actions";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektInput } from "../../../style/elements/input.style";
import { EffektLoadingSpinner } from "../../../style/elements/loading-spinner";
import { EffektSelect } from "../../../style/elements/select.style";
import { DistributionInput } from "../../shared/distribution-input/DistributionInput";
import Decimal from "decimal.js";
import { getDonorTaxUnitsAction } from "../../../../store/donors/donor-page.actions";
import { fetchAllCauseareasAction } from "../../../../store/causeareas/causeareas.action";

export const EditVippsAgreement: React.FC<{ initial: IVippsAgreement }> = ({ initial }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const currentAgreementUpdating: boolean | undefined = useSelector(
    (state: AppState) => state.vippsAgreements.currentAgreementUpdating,
  );
  const taxUnits = useSelector((state: AppState) => state.distributions.distributionInput.taxUnits);

  const [newAmount, setNewAmount] = useState<number>(initial ? initial.amount : 0);
  const allCauseAreas = useSelector((state: AppState) => state.causeareas.all);
  const [newChargeDay, setNewChargeDay] = useState<number>(
    initial ? initial.monthly_charge_day : 0,
  );
  const [newStatus, setNewStatus] = useState<string>(initial?.status || "ACTIVE");
  const [newDistribution, setNewDistribution] = useState<Partial<IDistribution>>(
    initial?.distribution ?? {},
  );

  useEffect(() => {
    if (initial && allCauseAreas) {
      const inputDist = {
        ...initial.distribution,
        causeAreas: initial.distribution?.causeAreas.map((causeArea) => ({
          ...causeArea,
          organizations: causeArea.organizations.map((organization) => ({
            ...organization,
          })),
        })),
      };

      for (const causeArea of allCauseAreas) {
        const foundCauseArea = inputDist.causeAreas.find((c) => c.id === causeArea.id);
        if (!foundCauseArea) {
          inputDist.causeAreas.push({
            ...causeArea,
            percentageShare: new Decimal(0),
            standardSplit: true,
            organizations: causeArea.organizations
              .filter((org) => org.standardShare.isPositive())
              .map((org) => {
                return {
                  ...org,
                  percentageShare: new Decimal(org.standardShare),
                };
              }),
          });
        }
      }

      setNewDistribution(inputDist);
    }
  }, [initial, allCauseAreas]);

  useEffect(() => {
    if (!taxUnits) {
      const donorId = newDistribution.donorId;
      if (typeof donorId !== "undefined") {
        getAccessTokenSilently().then((token) => {
          dispatch(getDonorTaxUnitsAction.started({ token, id: donorId }));
        });
      }
    }
  }, [newDistribution.donorId, taxUnits, getAccessTokenSilently, dispatch]);

  useEffect(() => {
    if (!allCauseAreas) {
      dispatch(fetchAllCauseareasAction.started(undefined));
    }
  }, [dispatch, allCauseAreas]);

  if (!taxUnits) {
    return <span>Loading...</span>;
  }

  if (!allCauseAreas) {
    return <span>Loading...</span>;
  }

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px 0px 10px 20px",
        borderLeft: "1px solid black",
        width: "400px",
        position: "relative",
      }}
    >
      <div
        style={{
          display: currentAgreementUpdating ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,.5)",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0px",
          top: "0px",
          zIndex: 1000,
        }}
      >
        <EffektLoadingSpinner />
      </div>
      <div>
        <label>Amount</label>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EffektInput
            defaultValue={initial.amount}
            type="number"
            onChange={(e) => setNewAmount(parseInt(e.currentTarget.value))}
          ></EffektInput>
          <EffektButton
            disabled={!Number.isInteger(newAmount)}
            onClick={() => {
              getAccessTokenSilently().then((token) =>
                dispatch(
                  updateVippsAmountAction.started({
                    urlcode: initial.agreement_url_code,
                    amount: newAmount * 100,
                    token,
                  }),
                ),
              );
            }}
          >
            Set new sum
          </EffektButton>
        </div>
      </div>
      <br />

      <div>
        <label>Status</label>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EffektSelect
            name="status"
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.currentTarget.value)}
          >
            <option value="ACTIVE">Active</option>
            <option value="STOPPED">Stopped</option>
          </EffektSelect>
          <EffektButton
            onClick={() => {
              getAccessTokenSilently().then((token) => {
                if (newStatus === "STOPPED") {
                  dispatch(
                    updateVippsStatusAction.started({
                      urlcode: initial.agreement_url_code,
                      token,
                    }),
                  );
                } else {
                  alert("Only cancellation (STOPPED) is supported");
                }
              });
            }}
          >
            Cancel agreement
          </EffektButton>
        </div>
      </div>
      <br />

      <div>
        <label>Charge day</label>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EffektInput
            defaultValue={initial.monthly_charge_day}
            type="number"
            onChange={(e) => setNewChargeDay(parseInt(e.currentTarget.value))}
          ></EffektInput>
          <EffektButton
            disabled={newChargeDay < 0 || newChargeDay > 28}
            onClick={() => {
              getAccessTokenSilently().then((token) =>
                dispatch(
                  updateVippsChargeDayAction.started({
                    urlcode: initial.agreement_url_code,
                    chargeDay: newChargeDay,
                    token,
                  }),
                ),
              );
            }}
          >
            Set new charge day
          </EffektButton>
        </div>
      </div>
      <br />

      <div>
        <label>Distribution</label>
        <DistributionInput
          causeAreas={allCauseAreas}
          taxUnits={taxUnits}
          distribution={newDistribution}
          onChange={(distribution) => setNewDistribution(distribution)}
        />
        <br />
        <EffektButton
          onClick={() => {
            getAccessTokenSilently().then((token) => {
              if (typeof newDistribution.kid !== "undefined" && "kid" in newDistribution) {
                dispatch(
                  updateVippsDistributionAction.started({
                    distribution: newDistribution as IDistribution,
                    token,
                    urlcode: initial.agreement_url_code,
                  }),
                );
              }
            });
          }}
        >
          Set new distribution
        </EffektButton>
      </div>
    </div>
  );
};
