import { IOrganization } from "../../models/types";
import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const fetchAllOrganizationsAction = actionCreator.async<
  undefined,
  Array<IOrganization>,
  Error
>("FETCH_ALL_ORGANIZATIONS");

export const createOrganizationAction = actionCreator.async<
  { token: string; organization: Partial<IOrganization> },
  IOrganization,
  Error
>("CREATE_ORGANIZATION");

export const updateOrganizationAction = actionCreator.async<
  { token: string; organization: IOrganization },
  IOrganization,
  Error
>("UPDATE_ORGANIZATION");

export const toggleOrganizationActiveAction = actionCreator.async<
  { token: string; organizationId: number },
  IOrganization,
  Error
>("TOGGLE_ORGANIZATION_ACTIVE");
