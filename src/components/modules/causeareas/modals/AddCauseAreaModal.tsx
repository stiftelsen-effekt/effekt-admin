import React, { useState } from "react";
import { Save } from "react-feather";
import { EffektModal } from "../../../style/elements/effekt-modal/effekt-modal.component.style";
import { EffektButton } from "../../../style/elements/button.style";
import { EffektInput } from "../../../style/elements/input.style";
import { ModalContent, ModalTitle, FormGroup, ModalFooter } from "../CauseAreas.style";
import { toastError } from "../../../../util/toasthelper";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (causeArea: {
    name: string;
    shortDescription?: string;
    longDescription?: string;
    informationUrl?: string;
    ordering: number;
    standardPercentageShare: number;
  }) => void;
}

const AddCauseAreaModal: React.FunctionComponent<Props> = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [informationUrl, setInformationUrl] = useState("");
  const [ordering, setOrdering] = useState(99);
  const [standardPercentageShare, setStandardPercentageShare] = useState(0);

  const resetForm = () => {
    setName("");
    setShortDescription("");
    setLongDescription("");
    setInformationUrl("");
    setOrdering(99);
    setStandardPercentageShare(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSave = () => {
    if (!name.trim()) {
      toastError("Validation Error", "Cause area name is required");
      return;
    }

    onSave({
      name,
      shortDescription: shortDescription || "",
      longDescription: longDescription || "",
      informationUrl: informationUrl || "",
      ordering,
      standardPercentageShare,
    });

    resetForm();
  };

  return (
    <EffektModal visible={visible} effect="fadeInUp" onClickAway={handleClose}>
      <ModalContent>
        <ModalTitle>Add Cause Area</ModalTitle>
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
            <Save size={16} style={{ marginRight: "5px" }} /> Save
          </EffektButton>
        </ModalFooter>
      </ModalContent>
    </EffektModal>
  );
};

export default AddCauseAreaModal;
