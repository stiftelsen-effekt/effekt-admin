import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../models/state";
import {
  fetchAllRefferalsAction,
  createReferralTypeAction,
  updateReferralTypeAction,
  toggleReferralTypeActiveAction,
} from "../../../store/referrals/referrals.action";
import { Page } from "../../style/elements/page.style";
import { MainHeader } from "../../style/elements/headers.style";
import { Edit, Plus, Save, ToggleLeft, ToggleRight } from "react-feather";
import { toastError } from "../../../util/toasthelper";
import { IReferralType } from "../../../models/types";
import { EffektModal } from "../../style/elements/effekt-modal/effekt-modal.component.style";
import { EffektButton } from "../../style/elements/button.style";
import { EffektInput } from "../../style/elements/input.style";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ModalContent,
  ModalTitle,
  FormGroup,
  ModalFooter,
  TableActionsWrapper,
  StatusBadge,
  PageActionsWrapper,
  LoadingWrapper,
  TableWrapper,
} from "./ReferralTypes.style";
import { EffektTable } from "../../style/elements/react-table/EffektTable";

interface Props {}

const ReferralTypesPage: React.FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const referralTypes = useSelector((state: AppState) => state.referrals.all);
  const loading = useSelector((state: AppState) => state.referrals.loading);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingType, setEditingType] = useState<IReferralType | null>(null);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeOrdering, setNewTypeOrdering] = useState(0);
  const [editTypeName, setEditTypeName] = useState("");
  const [editTypeOrdering, setEditTypeOrdering] = useState(0);

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      dispatch(fetchAllRefferalsAction.started(undefined));
    });
  }, [getAccessTokenSilently, dispatch]);

  const handleAddType = () => {
    if (!newTypeName.trim()) {
      toastError("Validation Error", "Please enter a referral type name");
      return;
    }

    getAccessTokenSilently().then((token) => {
      dispatch(
        createReferralTypeAction.started({
          token,
          referral: {
            name: newTypeName,
            ordering: newTypeOrdering,
          },
        }),
      );
    });

    setShowAddModal(false);
    setNewTypeName("");
    setNewTypeOrdering(0);
  };

  const handleEditType = () => {
    if (!editingType) return;

    if (!editTypeName.trim()) {
      toastError("Validation Error", "Please enter a referral type name");
      return;
    }

    getAccessTokenSilently().then((token) => {
      dispatch(
        updateReferralTypeAction.started({
          token,
          referral: {
            id: editingType.id,
            name: editTypeName,
            ordering: editTypeOrdering,
          },
        }),
      );
    });

    setShowEditModal(false);
    setEditingType(null);
  };

  const handleToggleActive = (id: number) => {
    getAccessTokenSilently().then((token) => {
      dispatch(
        toggleReferralTypeActiveAction.started({
          token,
          referralId: id,
        }),
      );
    });
  };

  const openEditModal = (type: IReferralType) => {
    setEditingType(type);
    setEditTypeName(type.name);
    setEditTypeOrdering(type.ordering);
    setShowEditModal(true);
  };

  const columns: ColumnDef<IReferralType>[] = [
    {
      header: "ID",
      accessorKey: "id",
      size: 60,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Order",
      accessorKey: "ordering",
      size: 80,
    },
    {
      header: "Status",
      accessorKey: "is_active",
      size: 100,
      cell: ({ getValue }) => (
        <StatusBadge active={Boolean(getValue<boolean>())}>
          {getValue<boolean>() ? "Active" : "Inactive"}
        </StatusBadge>
      ),
    },
    {
      header: "Actions",
      id: "actions",
      size: 200,
      enableSorting: false,
      cell: ({ row }) => (
        <TableActionsWrapper>
          <EffektButton onClick={() => openEditModal(row.original)}>
            <Edit size={18} />
          </EffektButton>
          <EffektButton onClick={() => handleToggleActive(row.original.id)}>
            {row.original.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </EffektButton>
        </TableActionsWrapper>
      ),
    },
  ];

  return (
    <Page>
      <MainHeader>Referral Types</MainHeader>

      <PageActionsWrapper>
        <EffektButton onClick={() => setShowAddModal(true)}>
          <Plus size={18} style={{ marginRight: "5px" }} /> Add Referral Type
        </EffektButton>
      </PageActionsWrapper>

      {loading && <LoadingWrapper>Loading...</LoadingWrapper>}

      {!loading && referralTypes && referralTypes.length > 0 && (
        <TableWrapper>
          <EffektTable
            data={referralTypes}
            columns={columns}
            defaultPageSize={25}
            loading={loading}
          />
        </TableWrapper>
      )}

      {!loading && (!referralTypes || referralTypes.length === 0) && (
        <LoadingWrapper>
          No referral types found. Click "Add Referral Type" to create one.
        </LoadingWrapper>
      )}

      {/* Add Modal */}
      <EffektModal
        visible={showAddModal}
        effect="fadeInUp"
        onClickAway={() => setShowAddModal(false)}
      >
        <ModalContent>
          <ModalTitle>Add Referral Type</ModalTitle>
          <FormGroup>
            <label>Name</label>
            <EffektInput
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              placeholder="Enter referral type name"
            />
          </FormGroup>
          <FormGroup>
            <label>Ordering</label>
            <EffektInput
              type="number"
              value={newTypeOrdering}
              onChange={(e) => setNewTypeOrdering(parseInt(e.target.value) || 0)}
              placeholder="Display order"
            />
          </FormGroup>
          <ModalFooter>
            <EffektButton onClick={() => setShowAddModal(false)}>Cancel</EffektButton>
            <EffektButton onClick={handleAddType}>
              <Save size={16} style={{ marginRight: "5px" }} /> Save
            </EffektButton>
          </ModalFooter>
        </ModalContent>
      </EffektModal>

      {/* Edit Modal */}
      <EffektModal
        visible={showEditModal}
        effect="fadeInUp"
        onClickAway={() => setShowEditModal(false)}
      >
        <ModalContent>
          <ModalTitle>Edit Referral Type</ModalTitle>
          <FormGroup>
            <label>Name</label>
            <EffektInput
              value={editTypeName}
              onChange={(e) => setEditTypeName(e.target.value)}
              placeholder="Enter referral type name"
            />
          </FormGroup>
          <FormGroup>
            <label>Ordering</label>
            <EffektInput
              type="number"
              value={editTypeOrdering}
              onChange={(e) => setEditTypeOrdering(parseInt(e.target.value) || 0)}
              placeholder="Display order"
            />
          </FormGroup>
          <ModalFooter>
            <EffektButton onClick={() => setShowEditModal(false)}>Cancel</EffektButton>
            <EffektButton onClick={handleEditType}>
              <Save size={16} style={{ marginRight: "5px" }} /> Save Changes
            </EffektButton>
          </ModalFooter>
        </ModalContent>
      </EffektModal>
    </Page>
  );
};

export default ReferralTypesPage;
