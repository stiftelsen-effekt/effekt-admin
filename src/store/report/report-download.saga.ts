import { Action } from "typescript-fsa";
import {
  IFetchAutogiroShipmentsActionParams,
  fetchAutogiroShipmentsAction,
} from "./report-download.action";
import * as API from "../../util/api";
import { call, put } from "redux-saga/effects";

export function* fetchAutogiroShipments(action: Action<IFetchAutogiroShipmentsActionParams>) {
  try {
    const data: API.Response = yield call(API.call, {
      endpoint: `/autogiro/shipments`,
      method: API.Method.GET,
      token: action.payload.token,
    });
    if (data.status !== 200) throw new Error(data.content);
    else {
      yield put(
        fetchAutogiroShipmentsAction.done({ params: action.payload, result: data.content }),
      );
    }
  } catch (ex) {
    yield put(fetchAutogiroShipmentsAction.failed({ params: action.payload, error: ex as Error }));
  }
}
