export const DEV_ENVIRONMENT: boolean = process.env.NODE_ENV === 'development' ? true : false;
export const API_URL: string = false ? 'http://localhost:3000' : 'https://data.gieffektivt.no';
export const API_AUTH: IApiAuth = {
  clientId: '1b43d77677588cfe9302fa729d1ab',
  permissions: [
    'read_user_info',
    'read_user_donations',
    'read_all_donations',
    'write_all_donations',
  ],
};

interface IApiAuth {
  clientId: string;
  permissions: Array<string>;
}
