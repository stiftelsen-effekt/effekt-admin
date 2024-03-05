import React, { useState } from "react";
import { IDonation } from "../../../models/types";
import { EffektInput } from "../../style/elements/input.style";
import { EditDonationWrapper } from "./EditDonation.style";
import { useSelector } from "react-redux";
import { AppState } from "../../../models/state";

export const EditDonation: React.FC<{ inputDonation: IDonation }> = ({ inputDonation }) => {
  // Make a copy of the inputDonation object
  const [donation, setDonation] = useState(JSON.parse(JSON.stringify(inputDonation)));

  const paymentMethods = useSelector((state: AppState) => state.singleDonation.paymentMethods);

  return (
    <EditDonationWrapper>
      <strong>Sum:</strong>
      <EffektInput
        value={donation.sum}
        onChange={(e) => {
          if (Number.isNaN(e.currentTarget.value)) {
            return;
          }
          if (parseFloat(e.currentTarget.value) < 0) {
            return;
          }
          setDonation({ ...donation, sum: parseFloat(e.target.value) });
        }}
      ></EffektInput>
      <strong>Payment method:</strong>
      <select
        value={donation.paymentMethodId}
        onChange={(e) => setDonation({ ...donation, paymentMethodId: parseInt(e.target.value) })}
      >
        {paymentMethods.map((pm) => (
          <option key={pm.id} value={pm.id}>
            {pm.name}
          </option>
        ))}
      </select>
    </EditDonationWrapper>
  );
};
