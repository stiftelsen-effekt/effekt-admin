import React, { useEffect, useState } from "react";

import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { ChevronDown, Info, PlusSquare } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  createVippsMatchingRuleAction,
  deleteVippsMatchingRuleAction,
  fetchVippsMatchingRulesAction,
} from "../../../store/vipps/vipps.actions";
import { useAuth0 } from "@auth0/auth0-react";
import { IVippsMatchingRule } from "../../../models/types";
import { shortDate } from "../../../util/formatting";
import { AppState } from "../../../models/state";
import { Trash2 } from "react-feather";
import { EffektModal } from "../../style/elements/effekt-modal/effekt-modal.component.style";
import { DateTime } from "luxon";
import { EffektDatePicker } from "../../style/elements/datepicker/datepicker.style";
import { EffektButton } from "../../style/elements/button.style";
import { EffektInput } from "../../style/elements/input.style";

export const VippsMatchingRulesPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [explenationExpanded, setExplenationExpanded] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [draftRule, setDraftRule] = useState<Partial<IVippsMatchingRule>>({
    salesLocation: "",
    message: "",
    resolveKID: "",
    resolveAdoveoFundraiserID: null,
    periodFrom: DateTime.now().startOf("month"),
    periodTo: DateTime.now().plus({ years: 1 }).endOf("month"),
    precedence: 10,
  });
  const rules = useSelector((state: AppState) => state.vippsMatchingRules.rules);
  const loading = useSelector((state: AppState) => state.vippsMatchingRules.loading);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        fetchVippsMatchingRulesAction.started({
          token,
        }),
      );
    });
  }, [getAccessTokenSilently, dispatch]);

  useEffect(() => {
    if (loading && showCreate) {
      setShowCreate(false);
    }
  }, [loading, showCreate]);

  return (
    <Page>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1000,
            }}
          >
            <h2>Loading...</h2>
          </div>
        )}

        <MainHeader>Vipps matching rules</MainHeader>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
              maxWidth: "800px",
              padding: "10px",
              border: "1px solid #000",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                gap: "10px",
              }}
              onClick={() => setExplenationExpanded(!explenationExpanded)}
            >
              <Info size={16} />
              <h3
                style={{
                  fontSize: "16px",
                  margin: 0,
                }}
              >
                What are matching rules?
              </h3>
              <ChevronDown
                size={20}
                style={{
                  marginLeft: "auto",
                  transform: explenationExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              />
            </div>
            <div
              style={{
                height: explenationExpanded ? "auto" : "0px",
                overflow: "hidden",
              }}
            >
              <p>
                Vipps matching rules are criteria defined in a database that help automatically
                process Vipps transactions, especially when a KID (Customer Identification Number)
                isn't directly present in the transaction message.
              </p>
              <p>They are used to:</p>
              <ol>
                <li>
                  <strong>Identify and categorize donations:</strong> When a Vipps transaction
                  report is uploaded (often for donations not made via a standard e-commerce
                  platform, like student fundraisers), the system first checks if a KID is
                  explicitly in the transaction's message field.
                </li>
                <li>
                  <strong>Apply a predefined KID:</strong> If no direct KID is found, the system
                  attempts to match the transaction against these "parsing rules."
                </li>
                <li>
                  <strong>Match based on transaction details:</strong> A rule typically matches if:
                  <ul>
                    <li>
                      The salesLocation in the rule matches the transaction.location (where the
                      Vipps payment was made).
                    </li>
                    <li>
                      The message in the rule matches the transaction.message, or if the rule's
                      message field is set to accept any (or empty) message from the transaction.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Resolve to a specific KID:</strong> If a transaction matches a rule, the
                  system uses the resolveKID (and potentially a resolveAdoveoFundraiserId) specified
                  in that rule to record the donation. This allows donations without explicit KIDs
                  in their message to still be correctly attributed and processed.
                </li>
              </ol>
              <p></p>In short, these rules act as a fallback mechanism to assign a correct KID to
              Vipps transactions based on other transaction data like the sales location and message
              content, ensuring donations are properly logged even if the KID isn't directly
              provided in the transaction details.
            </div>
          </div>
          <EffektButton onClick={() => setShowCreate(true)}>
            <PlusSquare /> Add rule
          </EffektButton>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                Sales Location
              </th>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                Message
              </th>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                Resolve KID
              </th>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                Adoveo ID
              </th>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                From
              </th>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                To
              </th>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                Precendence
              </th>
              <th style={{ borderBottom: "2px solid #000", padding: "10px", textAlign: "left" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rules
              .sort((a, b) => b.id - a.id)
              .map((rule: IVippsMatchingRule) => (
                <tr key={rule.id}>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {rule.salesLocation}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {rule.message}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {rule.resolveKID}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {rule.resolveAdoveoFundraiserID}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {shortDate(rule.periodFrom)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {shortDate(rule.periodTo)}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    {rule.precedence}
                  </td>
                  <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                    <EffektButton
                      onClick={() => {
                        getAccessTokenSilently().then((token) => {
                          dispatch(
                            deleteVippsMatchingRuleAction.started({
                              token: token,
                              id: rule.id,
                            }),
                          );
                        });
                      }}
                    >
                      <Trash2 size={16} />
                    </EffektButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <EffektModal
          visible={showCreate}
          effect="fadeInUp"
          onClickAway={() => setShowCreate(false)}
        >
          <div style={{ padding: "20px" }}>
            <h2>Create New Matching Rule</h2>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              onSubmit={(e) => {
                e.preventDefault();
                getAccessTokenSilently().then((token) => {
                  dispatch(
                    createVippsMatchingRuleAction.started({
                      token,
                      rule: {
                        salesLocation: draftRule.salesLocation || "",
                        message: draftRule.message || "",
                        resolveKID: draftRule.resolveKID || "",
                        resolveAdoveoFundraiserID: draftRule.resolveAdoveoFundraiserID || null,
                        periodFrom: draftRule.periodFrom || DateTime.now(),
                        periodTo: draftRule.periodTo || DateTime.now().plus({ years: 1 }),
                        precedence: draftRule.precedence || 0,
                      },
                    }),
                  );
                  setShowCreate(false);
                });
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>Sales Location:</label>
                <EffektInput
                  type="text"
                  value={draftRule.salesLocation || ""}
                  onChange={(e) => setDraftRule({ ...draftRule, salesLocation: e.target.value })}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>Message:</label>
                <EffektInput
                  type="text"
                  value={draftRule.message || ""}
                  onChange={(e) => setDraftRule({ ...draftRule, message: e.target.value })}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>Resolve KID:</label>
                <EffektInput
                  type="text"
                  value={draftRule.resolveKID}
                  onChange={(e) => setDraftRule({ ...draftRule, resolveKID: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>Adoveo Fundraiser ID:</label>
                <EffektInput
                  type="number"
                  value={draftRule.resolveAdoveoFundraiserID || ""}
                  onChange={(e) =>
                    setDraftRule({
                      ...draftRule,
                      resolveAdoveoFundraiserID: parseInt(e.target.value) || null,
                    })
                  }
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>Period From:</label>
                <EffektDatePicker
                  selected={
                    draftRule.periodFrom
                      ? draftRule.periodFrom.toJSDate()
                      : DateTime.now().toJSDate()
                  }
                  dateFormat="dd.MM.yyyy"
                  onChange={(date) =>
                    setDraftRule({
                      ...draftRule,
                      periodFrom: DateTime.fromJSDate(date || new Date()),
                    })
                  }
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>Period To:</label>
                <EffektDatePicker
                  selected={
                    draftRule.periodTo
                      ? draftRule.periodTo.toJSDate()
                      : DateTime.now().plus({ years: 1 }).toJSDate()
                  }
                  dateFormat="dd.MM.yyyy"
                  onChange={(date) =>
                    setDraftRule({
                      ...draftRule,
                      periodTo: DateTime.fromJSDate(date || new Date()),
                    })
                  }
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label>Precedence:</label>
                <EffektInput
                  type="number"
                  value={draftRule.precedence || 0}
                  onChange={(e) =>
                    setDraftRule({ ...draftRule, precedence: parseInt(e.target.value) || 0 })
                  }
                  required
                />
              </div>
              <EffektButton type="submit">Create Rule</EffektButton>
            </form>
          </div>
        </EffektModal>
      </div>
    </Page>
  );
};
