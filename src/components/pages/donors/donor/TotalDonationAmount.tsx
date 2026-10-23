import React from "react";
import { TotalDonationAmountWrapper } from "./TotalDonationAmount.style";
import { formatAmount } from "../../../../util/formatting";

interface IProps {
  totalDonationAmount: number;
  operationsDonationAmount: number;
}

export const TotalDonationAmount: React.FunctionComponent<IProps> = ({
  totalDonationAmount,
  operationsDonationAmount,
}) => {
  return (
    <TotalDonationAmountWrapper>
      <table width="100%" cellSpacing={0}>
        <tbody>
          <tr>
            <td> Total donations </td>
            <td> kr {formatAmount(totalDonationAmount)} </td>
          </tr>
          <tr>
            <td> Total except operations donations </td>
            <td> kr {formatAmount(totalDonationAmount - operationsDonationAmount)} </td>
          </tr>
        </tbody>
      </table>
    </TotalDonationAmountWrapper>
  );
};
