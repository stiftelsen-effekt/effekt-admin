import React, { useState, useEffect } from "react";
import { Save } from "react-feather";
import Decimal from "decimal.js";
import { ICauseArea } from "../../../../models/types";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektInput } from "../../../style/elements/input.style";
import { ModalContent, ModalTitle, FormGroup, ModalFooter } from "../CauseAreas.style";
import { toastError } from "../../../../util/toasthelper";

interface Props {
  visible: boolean;
  causeArea: ICauseArea | null;
  onClose: () => void;
  onSave: (causeArea: ICauseArea) => void;
}

const EditCauseAreaModal: React.FunctionComponent<Props> = ({
  visible,
  causeArea,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [informationUrl, setInformationUrl] = useState("");
  const [ordering, setOrdering] = useState(99);
  const [standardPercentageShare, setStandardPercentageShare] = useState(0);

  useEffect(() => {
    if (causeArea) {
      setName(causeArea.name);
      setShortDescription(causeArea.shortDescription || "");
      setLongDescription(causeArea.longDescription || "");
      setInformationUrl(causeArea.informationUrl || "");
      setOrdering(causeArea.ordering || 99);
      setStandardPercentageShare(causeArea.standardPercentageShare?.toNumber() || 0);
    }
  }, [causeArea]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    if (!causeArea) {
      return;
    }

    if (!name.trim()) {
      toastError("Validation Error", "Cause area name is required");
      return;
    }

    onSave({
      ...causeArea,
      name,
      shortDescription: shortDescription || "",
      longDescription: longDescription || "",
      informationUrl: informationUrl || "",
      ordering,
      standardPercentageShare: new Decimal(standardPercentageShare),
    });
  };

  return (
    <EffektModal visible={visible} effect="fadeInUp" onClickAway={handleClose}>
      <ModalContent>
        <ModalTitle>Edit Cause Area</ModalTitle>
        <FormGroup>
          <label>Name *</label>
          <EffektInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter cause area name"
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
          <label>Standard Percentage Share</label>
          <EffektInput
            type="number"
            value={standardPercentageShare}
            onChange={(e) => setStandardPercentageShare(parseInt(e.target.value) || 0)}
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

export default EditCauseAreaModal;
