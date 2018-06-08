import { X_API_KEY } from '../helpers/constants';


//TODO : add authorization token in req
export default class apiService {
    static createShortUrl(link) {
        return fetch('/api/v1/link', {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": X_API_KEY },
            body: JSON.stringify(link)
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                return err;
            });
    }

    static getUrl(id) {
        return fetch(`/api/v1/link/${id}`, {
            method: "GET",
            headers: { "x-api-key": X_API_KEY }
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                return err;
            });
    }
}