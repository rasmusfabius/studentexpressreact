import { ajax } from 'rxjs/ajax';

export class Api {
  static URL = 'http://localhost:3001';
  static fetch = (url, method = 'GET', body) => {
    return ajax({
      url: Api.URL + url,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    })
      .toPromise()
      .then(res => res.response);
  };
}
