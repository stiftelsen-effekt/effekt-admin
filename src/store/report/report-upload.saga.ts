import {
  uploadReportAction,
  ReportTypes,
  IUploadReportActionParams,
} from "./report-upload.actions";
import { put, call } from "redux-saga/effects";
import * as API from "../../util/api";
import { Action } from "typescript-fsa";

export function* uploadReport(action: Action<IUploadReportActionParams>) {
  try {
    let reportType;
    switch (action.payload.type) {
      case ReportTypes.OCR:
        reportType = "ocr";
        break;
      case ReportTypes.PAYPAL:
        reportType = "paypal";
        break;
      case ReportTypes.VIPPS:
        reportType = "vipps";
        break;
      case ReportTypes.BANK:
        reportType = "bank";
        break;
      case ReportTypes.FACEBOOK:
        reportType = "facebook";
        break;
      case ReportTypes.ADOVEO_FUNDRAISER:
        reportType = "adoveo/fundraiser/" + action.payload.resourceId;
        break;
      case ReportTypes.ADOVEO_GIFTCARDS:
        reportType = "adoveo/giftcards";
        break;
      default:
        throw new Error("Report type not supported");
    }

    const formData = new FormData();
    if (action.payload.report) {
      formData.append("report", action.payload.report);
    }

    formData.append("metaOwnerID", action.payload.metaOwnerID.toString());

    var data: API.Response = yield call(API.call, {
      endpoint: `/reports/${reportType}`,
      method: API.Method.POST,
      token: action.payload.token,
      formData: formData,
    });
    if (data.status !== 200) throw new Error(data.content);
    else {
      yield put(uploadReportAction.done({ params: action.payload, result: data.content }));
    }
  } catch (ex) {
    yield put(uploadReportAction.failed({ params: action.payload, error: ex as Error }));
  }
}
