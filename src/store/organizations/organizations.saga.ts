import { call, put } from "redux-saga/effects";
import * as API from "../../util/api";
import { toastError, toastSuccess } from "../../util/toasthelper";
import {
  fetchAllOrganizationsAction,
  createOrganizationAction,
  updateOrganizationAction,
  toggleOrganizationActiveAction,
} from "./organizations.action";

export function* fetchAllOrganizations(action: any) {
  try {
    var data: API.Response = yield call(API.call, {
      endpoint: "/organizations/all/",
      method: API.Method.GET,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(fetchAllOrganizationsAction.done({ params: action.payload, result: data.content }));
  } catch (ex) {
    yield put(fetchAllOrganizationsAction.failed({ error: ex as Error }));
    toastError("Failed to fetch organizations", (ex as Error).message);
  }
}

export function* createOrganization(action: any) {
  try {
    const { token, organization } = action.payload;
    var data: API.Response = yield call(API.call, {
      endpoint: "/organizations/",
      method: API.Method.POST,
      token: token,
      data: {
        name: organization.name,
        abbreviation: organization.abbreviation,
        shortDescription: organization.shortDescription,
        longDescription: organization.longDescription,
        informationUrl: organization.informationUrl,
        ordering: organization.ordering,
        standardShare: organization.standardShare.toNumber(),
        causeAreaId: organization.causeAreaId,
      },
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(createOrganizationAction.done({ params: action.payload, result: data.content }));
    yield put(fetchAllOrganizationsAction.started(undefined));
    toastSuccess("Organization created successfully");
  } catch (ex) {
    yield put(createOrganizationAction.failed({ params: action.payload, error: ex as Error }));
    toastError("Failed to create organization", (ex as Error).message);
  }
}

export function* updateOrganization(action: any) {
  try {
    const { token, organization } = action.payload;
    var data: API.Response = yield call(API.call, {
      endpoint: `/organizations/${organization.id}`,
      method: API.Method.PUT,
      token: token,
      data: {
        name: organization.name,
        abbreviation: organization.abbreviation,
        shortDescription: organization.shortDescription,
        longDescription: organization.longDescription,
        informationUrl: organization.informationUrl,
        isActive: organization.isActive,
        ordering: organization.ordering,
        standardShare: organization.standardShare.toNumber(),
        causeAreaId: organization.causeAreaId,
      },
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(updateOrganizationAction.done({ params: action.payload, result: data.content }));
    yield put(fetchAllOrganizationsAction.started(undefined));
    toastSuccess("Organization updated successfully");
  } catch (ex) {
    yield put(updateOrganizationAction.failed({ params: action.payload, error: ex as Error }));
    toastError("Failed to update organization", (ex as Error).message);
  }
}

export function* toggleOrganizationActive(action: any) {
  try {
    const { token, organizationId } = action.payload;
    var data: API.Response = yield call(API.call, {
      endpoint: `/organizations/${organizationId}/toggle-active`,
      method: API.Method.PUT,
      token: token,
    });
    if (data.status !== 200) throw new Error(data.content);
    yield put(
      toggleOrganizationActiveAction.done({ params: action.payload, result: data.content }),
    );
    yield put(fetchAllOrganizationsAction.started(undefined));
    toastSuccess("Organization status updated successfully");
  } catch (ex) {
    yield put(
      toggleOrganizationActiveAction.failed({ params: action.payload, error: ex as Error }),
    );
    toastError("Failed to toggle organization status", (ex as Error).message);
  }
}
