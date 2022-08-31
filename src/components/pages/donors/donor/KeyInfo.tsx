import React, { useEffect } from 'react';
import Validator from 'validator';
import { AppState } from '../../../../models/state';
import { DateTime } from 'luxon';
import { DonorKeyInfoWrapper } from './KeyInfo.style';
import { DonorKeyInfoField, FieldType } from './KeyInfoField';
import { IDonor } from '../../../../models/types';
import { toastError } from '../../../../util/toasthelper';
import { useSelector } from 'react-redux';
import { validateSSNOrOrgnr } from '../../../../util/validators';
import { EffektLoadingSpinner } from '../../../style/elements/loading-spinner';

export const DonorKeyInfo: React.FunctionComponent<{ donor: IDonor }> = ({ donor }) => {
  const pendingUpdates = useSelector((state: AppState) => state.donorPage.pendingUpdates);
  const updateError = useSelector((state: AppState) => state.donorPage.updateError);
  useEffect(() => {
    if (updateError?.message) toastError('Donor not modified', updateError.message);
  }, [updateError, pendingUpdates]);

  return (
    <DonorKeyInfoWrapper>
      <table className={pendingUpdates ? 'updating' : undefined} width="100%" cellSpacing={0}>
        <tbody>
          <DonorKeyInfoField donor={donor} field="name" label="Name" />
          <DonorKeyInfoField
            donor={donor}
            field="email"
            label="Email"
            validate={Validator.isEmail}
            editable={false}
          />
          <DonorKeyInfoField
            donor={donor}
            field="newsletter"
            type={FieldType.BooleanInput}
            label="Newsletter"
          />
          <DonorKeyInfoField
            donor={donor}
            field="trash"
            type={FieldType.BooleanInput}
            label="Trash"
          />
          <DonorKeyInfoField
            donor={donor}
            field="registered"
            type={FieldType.DateTimeInput}
            label="Registered"
            validate={(val: DateTime) => val.isValid}
            editable={false}
          />
        </tbody>
      </table>
      {Boolean(pendingUpdates) && <EffektLoadingSpinner />}
    </DonorKeyInfoWrapper>
  );
};
