export const SET_LOG_FILTER_FILESEARCH = "SET_LOG_FILTER_FILESEARCH";
export const setLogFilterFilesearchAction = (filesearch: string) => ({
  type: SET_LOG_FILTER_FILESEARCH,
  payload: filesearch,
});
