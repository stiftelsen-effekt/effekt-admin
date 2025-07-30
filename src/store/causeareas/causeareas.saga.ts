import { call, put } from "redux-saga/effects";
import * as API from "../../util/api";
import { toastError, toastSuccess } from "../../util/toasthelper";
import {
  fetchActiveCauseareasAction,
  fetchAllCauseareasAction,
  createCauseAreaAction,
  updateCauseAreaAction,
  toggleCauseAreaActiveAction,
} from "./causeareas.action";

export function* fetchActiveCauseAreas(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/causeareas/active/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchActiveCauseareasAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchActiveCauseareasAction.failed({ error: ex as Error }));
    toastError("Failed to fetch active cause areas", (ex as Error).message);
  }
}

export function* fetchAllCauseAreas(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/causeareas/all/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchAllCauseareasAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchAllCauseareasAction.failed({ error: ex as Error }));
    toastError("Failed to fetch all cause areas", (ex as Error).message);
  }
}

export function* createCauseArea(action: any) {
  try {
    const { token, causeArea } = action.payload;
    var data: API.Response = yield call(API.call, {
      endpoint: "/causeareas/",
      method: API.Method.POST,
      token: token,
      data: {
        name: causeArea.name,
        shortDescription: causeArea.shortDescription,
        longDescription: causeArea.longDescription,
        informationUrl: causeArea.informationUrl,
        ordering: causeArea.ordering,
        standardPercentageShare: causeArea.standardPercentageShare.toNumber(),
      },
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(createCauseAreaAction.done({ params: action.payload, result: data.content }));
    yield put(fetchAllCauseareasAction.started(undefined));
    toastSuccess("Cause area created successfully");
  } catch (ex) {
    yield put(createCauseAreaAction.failed({ params: action.payload, error: ex as Error }));
    toastError("Failed to create cause area", (ex as Error).message);
  }
}

export function* updateCauseArea(action: any) {
  try {
    const { token, causeArea } = action.payload;
    var data: API.Response = yield call(API.call, {
      endpoint: `/causeareas/${causeArea.id}`,
      method: API.Method.PUT,
      token: token,
      data: {
        name: causeArea.name,
        shortDescription: causeArea.shortDescription,
        longDescription: causeArea.longDescription,
        informationUrl: causeArea.informationUrl,
        isActive: causeArea.isActive,
        ordering: causeArea.ordering,
        standardPercentageShare: causeArea.standardPercentageShare.toNumber(),
      },
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(updateCauseAreaAction.done({ params: action.payload, result: data.content }));
    yield put(fetchAllCauseareasAction.started(undefined));
    toastSuccess("Cause area updated successfully");
  } catch (ex) {
    yield put(updateCauseAreaAction.failed({ params: action.payload, error: ex as Error }));
    toastError("Failed to update cause area", (ex as Error).message);
  }
}

export function* toggleCauseAreaActive(action: any) {
  try {
    const { token, causeAreaId } = action.payload;
    var data: API.Response = yield call(API.call, {
      endpoint: `/causeareas/${causeAreaId}/toggle-active`,
      method: API.Method.PUT,
      token: token,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(toggleCauseAreaActiveAction.done({ params: action.payload, result: data.content }));
    yield put(fetchAllCauseareasAction.started(undefined));
    toastSuccess("Cause area status updated successfully");
  } catch (ex) {
    yield put(toggleCauseAreaActiveAction.failed({ params: action.payload, error: ex as Error }));
    toastError("Failed to toggle cause area status", (ex as Error).message);
  }
}
