export interface IAccessKey {
  key: string;
  expires: Date;
}

export interface IAccessToken {
  token: string;
  expires: Date;
}

export interface ICallbackParameters {
  key: string;
  expires: Date;
  state: string;
}
