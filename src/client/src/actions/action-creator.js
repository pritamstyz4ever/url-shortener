import apiService from "../api"
import * as ACTION from "./action-types";

export function createShortUrl(url) {
    return function(dispatch) {
      return apiService
        .createShortUrl(url) //post
        .then(data => {
          //return data
          dispatch({ type: ACTION.SHORTEN_URL, payload: data });
        })
        .catch(err => {
          throw err;
        });
    };
  }