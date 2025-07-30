import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Plus, ArrowLeft } from "react-feather";
import { useAuth0 } from "@auth0/auth0-react";
import Decimal from "decimal.js";
import { AppState } from "../../../models/state";
import { IOrganization } from "../../../models/types";
import {
  fetchAllOrganizationsAction,
  createOrganizationAction,
  updateOrganizationAction,
  toggleOrganizationActiveAction,
} from "../../../store/organizations/organizations.action";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { EffektButton } from "../../style/elements/button.style";
import {
  PageActionsWrapper,
  WarningWrapper,
} from "../../modules/organizations/Organizations.style";
import OrganizationsList from "../../modules/organizations/list/OrganizationsList";
import AddOrganizationModal from "../../modules/organizations/modals/AddOrganizationModal";
import EditOrganizationModal from "../../modules/organizations/modals/EditOrganizationModal";
import { AlertTriangle } from "react-feather";

interface Props {}

const OrganizationsPage: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { causeAreaId } = useParams<{ causeAreaId: string }>();
  const { getAccessTokenSilently } = useAuth0();
  const organizations = useSelector((state: AppState) => state.organizations.all);
  const causeAreas = useSelector((state: AppState) => state.causeareas.all);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState<IOrganization | null>(null);

  const causeAreaIdNumber = causeAreaId ? parseInt(causeAreaId) : undefined;
  const currentCauseArea = causeAreas?.find((ca) => ca.id === causeAreaIdNumber);

  useEffect(() => {
    if (!organizations) {
      dispatch(fetchAllOrganizationsAction.started(undefined));
    }
  }, [organizations, dispatch]);

  const handleAddOrganization = (newOrganization: {
    name: string;
    abbreviation: string;
    shortDescription?: string;
    longDescription?: string;
    informationUrl?: string;
    ordering: number;
    standardShare: number;
    causeAreaId: number;
  }) => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        createOrganizationAction.started({
          token,
          organization: {
            ...newOrganization,
            standardShare: new Decimal(newOrganization.standardShare),
          },
        }),
      );
    });
    setShowAddModal(false);
  };

  const handleEditOrganization = (updatedOrganization: IOrganization) => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        updateOrganizationAction.started({
          token,
          organization: updatedOrganization,
        }),
      );
    });
    setShowEditModal(false);
    setEditingOrganization(null);
  };

  const handleToggleActive = (id: number) => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        toggleOrganizationActiveAction.started({
          token,
          organizationId: id,
        }),
      );
    });
  };

  const handleEditClick = (organization: IOrganization) => {
    setEditingOrganization(organization);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingOrganization(null);
  };

  const handleBackToCauseAreas = () => {
    history.push("/causeareas");
  };

  const pageTitle = currentCauseArea
    ? `Organizations - ${currentCauseArea.name}`
    : "All Organizations";

  const standardShareSum = useMemo(() => {
    return (
      organizations
        ?.filter((org) => org.causeAreaId === causeAreaIdNumber)
        .reduce((sum, org) => sum.plus(org.standardShare || 0), new Decimal(0)) || new Decimal(0)
    );
  }, [organizations, causeAreaIdNumber]);

  return (
    <Page>
      <MainHeader>{pageTitle}</MainHeader>

      <PageActionsWrapper>
        <EffektButton onClick={handleBackToCauseAreas}>
          <ArrowLeft size={18} style={{ marginRight: "5px" }} />
          Back to Cause Areas
        </EffektButton>

        <EffektButton onClick={() => setShowAddModal(true)}>
          <Plus size={18} style={{ marginRight: "5px" }} /> Add Organization
        </EffektButton>
      </PageActionsWrapper>

      {!standardShareSum.eq(100) && (
        <WarningWrapper>
          <AlertTriangle size={18} style={{ marginRight: "10px" }} />
          The total standard share of all organizations is {standardShareSum.toNumber()}%. It should
          be 100% within this cause area for proper functioning.
        </WarningWrapper>
      )}

      <OrganizationsList
        organizations={organizations}
        causeAreaId={causeAreaIdNumber}
        onEdit={handleEditClick}
        onToggleActive={handleToggleActive}
      />

      <AddOrganizationModal
        visible={showAddModal}
        causeAreaId={causeAreaIdNumber || 1}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddOrganization}
      />

      <EditOrganizationModal
        visible={showEditModal}
        organization={editingOrganization}
        onClose={handleCloseEditModal}
        onSave={handleEditOrganization}
      />
    </Page>
  );
};

export default OrganizationsPage;
