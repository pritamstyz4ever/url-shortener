import { BASE_URL } from "../helpers/constants";
import * as ACTION from "../actions/action-types";

export default class apiService {
    static createShortUrl(url) {
        return fetch('/api/v1/link', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(url)
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                return err;
            });
    }
}