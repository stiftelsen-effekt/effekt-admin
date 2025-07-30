import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AlertTriangle, Plus } from "react-feather";
import { useAuth0 } from "@auth0/auth0-react";
import Decimal from "decimal.js";
import { AppState } from "../../../models/state";
import { ICauseArea } from "../../../models/types";
import {
  fetchAllCauseareasAction,
  createCauseAreaAction,
  updateCauseAreaAction,
  toggleCauseAreaActiveAction,
} from "../../../store/causeareas/causeareas.action";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { EffektButton } from "../../style/elements/button.style";
import { PageActionsWrapper, WarningWrapper } from "../../modules/causeareas/CauseAreas.style";
import CauseAreasList from "../../modules/causeareas/list/CauseAreasList";
import AddCauseAreaModal from "../../modules/causeareas/modals/AddCauseAreaModal";
import EditCauseAreaModal from "../../modules/causeareas/modals/EditCauseAreaModal";

interface Props {}

const CauseAreasPage: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const causeAreas = useSelector((state: AppState) => state.causeareas.all);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCauseArea, setEditingCauseArea] = useState<ICauseArea | null>(null);

  useEffect(() => {
    if (!causeAreas) {
      dispatch(fetchAllCauseareasAction.started(undefined));
    }
  }, [causeAreas, dispatch]);

  const handleAddCauseArea = (newCauseArea: {
    name: string;
    shortDescription?: string;
    longDescription?: string;
    informationUrl?: string;
    ordering: number;
    standardPercentageShare: number;
  }) => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        createCauseAreaAction.started({
          token,
          causeArea: {
            ...newCauseArea,
            standardPercentageShare: new Decimal(newCauseArea.standardPercentageShare),
          },
        }),
      );
    });
    setShowAddModal(false);
  };

  const handleEditCauseArea = (updatedCauseArea: ICauseArea) => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        updateCauseAreaAction.started({
          token,
          causeArea: updatedCauseArea,
        }),
      );
    });
    setShowEditModal(false);
    setEditingCauseArea(null);
  };

  const handleToggleActive = (id: number) => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        toggleCauseAreaActiveAction.started({
          token,
          causeAreaId: id,
        }),
      );
    });
  };

  const handleEditClick = (causeArea: ICauseArea) => {
    setEditingCauseArea(causeArea);
    setShowEditModal(true);
  };

  const handleManageOrganizations = (causeAreaId: number) => {
    history.push(`/causeareas/${causeAreaId}/organizations`);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingCauseArea(null);
  };

  const standardShareSum = useMemo(() => {
    if (!causeAreas) return new Decimal(0);
    return causeAreas.reduce((sum, ca) => {
      return sum.plus(new Decimal(ca.standardPercentageShare || 0));
    }, new Decimal(0));
  }, [causeAreas]);

  return (
    <Page>
      <MainHeader>Cause Areas</MainHeader>

      <PageActionsWrapper>
        <EffektButton onClick={() => setShowAddModal(true)}>
          <Plus size={18} style={{ marginRight: "5px" }} /> Add Cause Area
        </EffektButton>
      </PageActionsWrapper>

      {!standardShareSum.eq(100) && (
        <WarningWrapper>
          <AlertTriangle size={18} style={{ marginRight: "10px" }} />
          The total standard share of all cause areas is {standardShareSum.toNumber()}%. It should
          be 100% for proper functioning.
        </WarningWrapper>
      )}

      <CauseAreasList
        causeAreas={causeAreas}
        onEdit={handleEditClick}
        onToggleActive={handleToggleActive}
        onManageOrganizations={handleManageOrganizations}
      />

      <AddCauseAreaModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCauseArea}
      />

      <EditCauseAreaModal
        visible={showEditModal}
        causeArea={editingCauseArea}
        onClose={handleCloseEditModal}
        onSave={handleEditCauseArea}
      />
    </Page>
  );
};

export default CauseAreasPage;
