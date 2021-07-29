import { IAccessToken } from "./auth";
import actionCreatorFactory from 'typescript-fsa';
 
const actionCreator = actionCreatorFactory();

export const fetchTokenAction = actionCreator.async<undefined, IAccessToken, Error>('FETCH_TOKEN');