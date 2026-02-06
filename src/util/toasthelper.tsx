import { toast } from "react-toastify";

export const toastError = (header: string, message: string) =>
  toast.error(
    <div>
      <strong>{header}</strong>
      <div style={{ fontSize: "12px" }}>{message}</div>
    </div>,
  );

export const infoToast = (header: string, message: string) =>
  toast.info(
    <div>
      <strong>{header}</strong>
      <div style={{ fontSize: "12px" }}>{message}</div>
    </div>,
  );

export const toastSuccess = (message: string) =>
  toast.success(
    <div>
      <strong>{message}</strong>
    </div>,
  );
