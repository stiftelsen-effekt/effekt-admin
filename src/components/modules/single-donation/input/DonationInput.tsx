import React, { useState, useEffect } from "react";

import { EffektDatePicker } from "../../../style/elements/datepicker/datepicker.style";

import Select from "react-select";

import { IPaymentMethod, IDonation } from "../../../../models/types";
import { KIDTextWrapper, DonationInputElement } from "../SingleDonation.style";

import { OwnerSelect } from "../../owner-select/OwnerSelect";

interface IProps {
  onChange(input: Partial<IDonation>): void;
  paymentMethods: Array<IPaymentMethod>;
  suggestedValues?: Partial<IDonation>;
}

interface IState extends Partial<IDonation> {}

export const DonationInput: React.FunctionComponent<IProps> = ({
  paymentMethods,
  onChange,
  suggestedValues,
}) => {
  const [state, setState] = useState<IState>({
    ...suggestedValues,
    KID: undefined,
    paymentId: (suggestedValues && suggestedValues.paymentId) || 4, //Defaults to vipps
    timestamp: (suggestedValues && suggestedValues.timestamp) || new Date(), //Defaults to now
  });

  useEffect(() => {
    setState((state) => {
      return { ...state, ...suggestedValues };
    });
  }, [suggestedValues]);

  useEffect(() => onChange(state), [state, onChange]);

  const methodToOption = (method: IPaymentMethod) => {
    return { value: method.id, label: method.name };
  };

  const getCurrentPaymentMethod = (): IPaymentMethod | undefined => {
    return paymentMethods.find((method) => method.id === state.paymentId);
  };

  const getMethodsSelect = (paymentMethods: Array<IPaymentMethod>) => {
    let current = getCurrentPaymentMethod();
    if (current) {
      return (
        <div style={{ width: "120px" }}>
          <Select
            options={paymentMethods.map((method) => methodToOption(method))}
            value={methodToOption(current)}
            onChange={(selected: any) => setState({ ...state, paymentId: selected.value })}
          ></Select>
        </div>
      );
    }
  };

  let methodsSelect = paymentMethods && getMethodsSelect(paymentMethods);

  return (
    <React.Fragment>
      <EffektDatePicker
        selected={state.timestamp}
        onChange={(timestamp) => timestamp && setState({ ...state, timestamp })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="dd.MM.yyyy HH:mm"
        timeCaption="time"
      />
      <KIDTextWrapper>
        <DonationInputElement
          placeholder="KID"
          value={state.KID || ""}
          style={{ height: "100%" }}
          onChange={(e) => setState({ ...state, KID: e.target.value })}
        />
      </KIDTextWrapper>

      <DonationInputElement
        value={state.sum || ""}
        placeholder="Sum"
        onChange={(e) => setState({ ...state, sum: parseInt(e.target.value) })}
      />

      <DonationInputElement
        value={state.paymentExternalRef}
        placeholder="External ref."
        onChange={(e) => setState({ ...state, paymentExternalRef: e.target.value })}
      />

      <div style={{ width: "120px" }}>
        <OwnerSelect></OwnerSelect>
      </div>

      {methodsSelect}
    </React.Fragment>
  );
};
