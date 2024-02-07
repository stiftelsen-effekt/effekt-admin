import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../models/state";
import { IAvtaleGiro, IDistribution } from "../../../../models/types";
import {
  updateAvtaleGiroAmountAction,
  updateAvtaleGiroStatusAction,
  updateAvtaleGiroPaymentDateAction,
  updateAvtaleGiroDistributionAction,
} from "../../../../store/avtalegiro/avtalegiro.actions";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektInput } from "../../../style/elements/input.style";
import { EffektLoadingSpinner } from "../../../style/elements/loading-spinner";
import { EffektSelect } from "../../../style/elements/select.style";
import { DistributionInput } from "../../shared/distribution-input/DistributionInput";
import Decimal from "decimal.js";

export const EditAvtaleGiroAgreement: React.FC<{ initial: IAvtaleGiro }> = ({ initial }) => {
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  const currentAgreementUpdating: boolean | undefined = useSelector(
    (state: AppState) => state.avtaleGiroAgreements.currentAgreementUpdating,
  );
  const [newAmount, setNewAmount] = useState<number>(initial ? initial.amount : 0);
  const allCauseAreas = useSelector((state: AppState) => state.causeareas.all);
  const [newPaymentDate, setNewPaymentDate] = useState<number>(initial ? initial.payment_date : 0);
  const [newStatus, setNewStatus] = useState<number | undefined>(initial?.active);
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
              .filter((org) => org.standardShare > 0)
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
            disabled={newAmount < 1}
            onClick={() => {
              getAccessTokenSilently().then((token) =>
                dispatch(
                  updateAvtaleGiroAmountAction.started({
                    KID: initial.KID,
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
            onChange={(e) => setNewStatus(parseInt(e.currentTarget.value))}
          >
            <option value="0">Inactive</option>
            <option value="1">Active</option>
          </EffektSelect>
          <EffektButton
            onClick={() => {
              getAccessTokenSilently().then((token) => {
                if (typeof newStatus !== "undefined") {
                  dispatch(
                    updateAvtaleGiroStatusAction.started({
                      KID: initial.KID,
                      status: newStatus,
                      token,
                    }),
                  );
                } else {
                  alert("No status selected");
                }
              });
            }}
          >
            Set new status
          </EffektButton>
        </div>
      </div>
      <br />

      <div>
        <label>Charge day</label>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <EffektInput
            defaultValue={initial.payment_date}
            type="number"
            onChange={(e) => setNewPaymentDate(parseInt(e.currentTarget.value))}
          ></EffektInput>
          <EffektButton
            disabled={newPaymentDate < 0 || newPaymentDate > 28}
            onClick={() => {
              getAccessTokenSilently().then((token) =>
                dispatch(
                  updateAvtaleGiroPaymentDateAction.started({
                    KID: initial.KID,
                    paymentDate: newPaymentDate,
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
          distribution={newDistribution}
          onChange={(distribution) => setNewDistribution(distribution)}
        />
        <br />
        <EffektButton
          onClick={() => {
            getAccessTokenSilently().then((token) => {
              if (typeof newDistribution.kid !== "undefined" && "kid" in newDistribution) {
                dispatch(
                  updateAvtaleGiroDistributionAction.started({
                    distribution: newDistribution as IDistribution,
                    token,
                    KID: initial.KID,
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
