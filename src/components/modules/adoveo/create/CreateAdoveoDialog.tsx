import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Plus } from "react-feather";
import { createAdoveoAction } from "../../../../store/adoveo/adoveo-list.actions";
import { AppState } from "../../../../models/state";
import { showDonorSelectionComponent } from "../../../../store/donors/donor-selection.actions";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektInput } from "../../../style/elements/input.style";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { EffektCheck } from "../../../style/elements/effekt-check/effekt-check.component";
import styled from "styled-components";
import { grey15 } from "../../../style/colors";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const CreateAdoveoDialog: React.FunctionComponent<Props> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const [name, setName] = useState("");
  const [adoveoId, setAdoveoId] = useState("");
  const [useStandardSplit, setUseStandardSplit] = useState(true);
  const [orgShares, setOrgShares] = useState<{ orgId: number; orgName: string; share: number }[]>(
    [],
  );
  const [donorId, setDonorId] = useState<number | undefined>(undefined);
  const [donorName, setDonorName] = useState<string>("");
  const [waitingForDonor, setWaitingForDonor] = useState(false);

  const selectedDonor = useSelector((state: AppState) => state.donorSelector.selectedDonor);
  const donorSelectorVisible = useSelector((state: AppState) => state.donorSelector.visible);
  const causeAreas = useSelector((state: AppState) => state.causeareas.all);

  useEffect(() => {
    if (waitingForDonor && selectedDonor && !donorSelectorVisible) {
      setDonorId(selectedDonor.id);
      setDonorName(selectedDonor.name);
      setWaitingForDonor(false);
    }
  }, [selectedDonor, donorSelectorVisible, waitingForDonor]);

  useEffect(() => {
    if (!useStandardSplit && causeAreas) {
      const orgs = causeAreas.flatMap((ca) =>
        ca.organizations.map((org) => ({
          orgId: org.id,
          orgName: org.name || org.abbreviation,
          share: 0,
        })),
      );
      setOrgShares(orgs);
    }
  }, [useStandardSplit, causeAreas]);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    const token = await getAccessTokenSilently();
    dispatch(
      createAdoveoAction.started({
        token,
        name: name.trim(),
        donorId,
        adoveoId: adoveoId ? parseInt(adoveoId) : undefined,
        useStandardSplit,
        orgShares: useStandardSplit
          ? undefined
          : orgShares
              .filter((s) => s.share > 0)
              .map((s) => ({ orgId: s.orgId, share: s.share, standardSplit: false })),
      }),
    );
    resetAndClose();
  };

  const resetAndClose = () => {
    setName("");
    setAdoveoId("");
    setUseStandardSplit(true);
    setOrgShares([]);
    setDonorId(undefined);
    setDonorName("");
    onClose();
  };

  const totalShare = orgShares.reduce((sum, s) => sum + s.share, 0);

  const standardSplitInfo = causeAreas
    ? causeAreas
        .flatMap((ca) =>
          ca.organizations.map((org) => ({
            name: org.name || org.abbreviation,
            share: (Number(ca.standardPercentageShare) * Number(org.standardShare)) / 100,
          })),
        )
        .filter((s) => s.share > 0)
    : [];

  return (
    <EffektModal visible={visible} onClickAway={resetAndClose}>
      <CreateAdoveoWrapper>
        <h3>Add Adoveo fundraiser</h3>

        <label>Name</label>
        <EffektInput
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Fundraiser name"
          style={{ width: "100%" }}
        />

        <label>Donor (optional)</label>
        <DonorRow>
          <EffektInput
            type="text"
            value={donorId ? `${donorName} (${donorId})` : ""}
            placeholder="No donor selected"
            readOnly
            style={{ flex: 1 }}
          />
          <EffektButton
            onClick={() => {
              setWaitingForDonor(true);
              dispatch(showDonorSelectionComponent());
            }}
          >
            Find
          </EffektButton>
          {donorId && (
            <EffektButton
              onClick={() => {
                setDonorId(undefined);
                setDonorName("");
              }}
            >
              Clear
            </EffektButton>
          )}
        </DonorRow>

        <label>Adoveo ID (optional)</label>
        <EffektInput
          type="number"
          value={adoveoId}
          onChange={(e) => setAdoveoId(e.target.value)}
          placeholder="External Adoveo ID"
          style={{ width: "100%" }}
        />

        <EffektCheck
          checked={useStandardSplit}
          label="Use standard split"
          inverted={false}
          onChange={(checked) => setUseStandardSplit(checked)}
        />

        {useStandardSplit && standardSplitInfo.length > 0 && (
          <StandardSplitInfo>
            <span>Current standard distribution:</span>
            {standardSplitInfo.map((s) => (
              <span key={s.name}>
                {s.name}: {Math.round(s.share * 100) / 100}%
              </span>
            ))}
          </StandardSplitInfo>
        )}

        {!useStandardSplit && (
          <>
            <label>Organization shares (total: {Math.round(totalShare * 10000) / 100}%)</label>
            {orgShares.map((s, idx) => (
              <OrgShareRow key={s.orgId}>
                <span>{s.orgName}</span>
                <EffektInput
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={s.share > 0 ? Math.round(s.share * 10000) / 100 : ""}
                  onChange={(e) => {
                    const newShares = [...orgShares];
                    newShares[idx] = {
                      ...s,
                      share: parseFloat(e.target.value || "0") / 100,
                    };
                    setOrgShares(newShares);
                  }}
                  placeholder="0"
                  style={{ width: "80px", textAlign: "right" }}
                />
                <span>%</span>
              </OrgShareRow>
            ))}
          </>
        )}

        <EffektButton disabled={!name.trim()} onClick={handleSubmit}>
          Add fundraiser <Plus size={16} />
        </EffektButton>
      </CreateAdoveoWrapper>
    </EffektModal>
  );
};

const CreateAdoveoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 450px;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;

  & > * {
    margin: 6px 0;
  }

  & > label {
    font-size: 14px;
    font-weight: 600;
    margin-top: 12px;
    margin-bottom: 2px;
  }

  & > button {
    justify-content: center;
    margin-top: 16px;

    svg {
      margin-left: 6px;
    }
  }
`;

const DonorRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 6px;
  align-items: center;
`;

const OrgShareRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 0;

  & > span:first-child {
    flex: 1;
    font-size: 14px;
  }
`;

const StandardSplitInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  background: #f8f8f8;
  border-left: 3px solid ${grey15};
  font-size: 13px;
  color: #555;

  & > span:first-child {
    font-weight: 600;
    margin-bottom: 4px;
    color: #333;
  }
`;
