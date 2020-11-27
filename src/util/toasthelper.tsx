import React from 'react';
import { toast } from 'react-toastify';

export const toastError = (header: string, message: string) =>
  toast.error(
    <div>
      <strong>{header}</strong>
      <div style={{ fontSize: '12px' }}>{message}</div>
    </div>,
  );
