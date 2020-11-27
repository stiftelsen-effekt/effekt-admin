import { IOrganization } from "../../types";
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const fetchActiveOrganizationsAction = actionCreator.async<undefined, Array<IOrganization>, Error>('FETCH_ACTIVE_ORGANIZATIONS');
