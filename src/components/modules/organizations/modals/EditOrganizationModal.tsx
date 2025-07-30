import React, { useState, useEffect } from "react";
import { Save } from "react-feather";
import Decimal from "decimal.js";
import { IOrganization } from "../../../../models/types";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektInput } from "../../../style/elements/input.style";
import { ModalContent, ModalTitle, FormGroup, ModalFooter } from "../Organizations.style";
import { toastError } from "../../../../util/toasthelper";

interface Props {
  visible: boolean;
  organization: IOrganization | null;
  onClose: () => void;
  onSave: (organization: IOrganization) => void;
}

const EditOrganizationModal: React.FunctionComponent<Props> = ({
  visible,
  organization,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [informationUrl, setInformationUrl] = useState("");
  const [ordering, setOrdering] = useState(99);
  const [standardShare, setStandardShare] = useState(0);

  useEffect(() => {
    if (organization) {
      setName(organization.name);
      setAbbreviation(organization.abbreviation);
      setShortDescription(organization.shortDescription || "");
      setLongDescription(organization.longDescription || "");
      setInformationUrl(organization.informationUrl || "");
      setOrdering(organization.ordering || 99);
      setStandardShare(organization.standardShare?.toNumber() || 0);
    }
  }, [organization]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (!organization) {
      return;
    }

    if (!name.trim()) {
      toastError("Validation Error", "Organization name is required");
      return;
    }

    if (!abbreviation.trim()) {
      toastError("Validation Error", "Organization abbreviation is required");
      return;
    }

    onSave({
      ...organization,
      name,
      abbreviation,
      shortDescription: shortDescription || "",
      longDescription: longDescription || "",
      informationUrl: informationUrl || "",
      ordering,
      standardShare: new Decimal(standardShare),
    });
  };

  return (
    <EffektModal visible={visible} effect="fadeInUp" onClickAway={handleClose}>
      <ModalContent>
        <ModalTitle>Edit Organization</ModalTitle>
        <FormGroup>
          <label>Name *</label>
          <EffektInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter organization name"
          />
        </FormGroup>
        <FormGroup>
          <label>Abbreviation *</label>
          <EffektInput
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
            placeholder="Enter abbreviation"
          />
        </FormGroup>
        <FormGroup>
          <label>Short Description</label>
          <EffektInput
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Brief description"
          />
        </FormGroup>
        <FormGroup>
          <label>Long Description</label>
          <EffektInput
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="Detailed description"
          />
        </FormGroup>
        <FormGroup>
          <label>Information URL</label>
          <EffektInput
            value={informationUrl}
            onChange={(e) => setInformationUrl(e.target.value)}
            placeholder="https://example.com"
          />
        </FormGroup>
        <FormGroup>
          <label>Ordering</label>
          <EffektInput
            type="number"
            value={ordering}
            onChange={(e) => setOrdering(parseInt(e.target.value) || 99)}
            placeholder="Display order"
          />
        </FormGroup>
        <FormGroup>
          <label>Standard Share</label>
          <EffektInput
            type="number"
            value={standardShare}
            onChange={(e) => setStandardShare(parseInt(e.target.value) || 0)}
            placeholder="Percentage (0-100)"
            min="0"
            max="100"
          />
        </FormGroup>
        <ModalFooter>
          <EffektButton onClick={handleClose}>Cancel</EffektButton>
          <EffektButton onClick={handleSave}>
            <Save size={16} style={{ marginRight: "5px" }} /> Save Changes
          </EffektButton>
        </ModalFooter>
      </ModalContent>
    </EffektModal>
  );
};

export default EditOrganizationModal;
