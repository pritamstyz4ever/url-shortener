import apiService from "../api"
import * as ACTION from "./action-types";

export function createShortUrl(link) {
  return (dispatch) => {
    return apiService
      .createShortUrl(link) //post
      .then(data => {
        console.log(data)
        dispatch({ type: ACTION.SHORTEN_URL, payload: data });
      })
      .catch(err => {
        throw err;
      });
  };
}
export function getUrl(id) {
  return (dispatch) => {
    return apiService
      .getUrl(id) //post
      .then(data => {
        console.log(data)
        dispatch({ type: ACTION.LINK_FETCHED, payload: Object.assign({}, data, { _id: id }) });
      })
      .catch(err => {
        throw err;
      });
  };
}