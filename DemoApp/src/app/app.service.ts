import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DemoService {
  constructor(private httpClient: HttpClient) {
  }

  private grantType: string = "client_credentials"
  private clientId: string = "<client_id>";
  private clientSecret: string = "<client_secret>";
  private securityURL: string = "https://outpost.mapmyindia.com/api/security/oauth/token?grant_type=" + this.grantType + "&client_id=" + this.clientId + "&client_secret=" + this.clientSecret;
  private autoSuggestURL: string = "https://atlas.mapmyindia.com/api/places/search/json?query=agra&location=28.5454,77.455454&bridge&explain&username=balmukand";
  private nearbyURL: string = "https://atlas.mapmyindia.com/api/places/nearby/json?explain&richData&username=balmukand&refLocation=28.467470,77.077518&keywords=FINATM";
  private geocodeURL: string = "https://atlas.mapmyindia.com/api/places/geocode?address=mapmyindia 237 okhla phase 3";
  private textsearchURL: string = "https://atlas.mapmyindia.com/api/places/textsearch/json?query=okhla phase 3&region=ind";

  getToken() {
    let promise = new Promise((resolve, reject) => {
        let apiURL = this.securityURL;
        this.httpClient.post(apiURL, null)
          .toPromise()
          .then(
          res => { // Success
              resolve(res);
            }
        );
    });
    return promise;
  }

  autoSuggest(token: string) {
      const _url = this.autoSuggestURL+"&access_token="+token;
      const promise = new Promise((resolve, reject) => {
        this.httpClient.get(_url)
          .toPromise()
          .then(
              res => { // Success
                  // console.log(res);
                  resolve(res);
              }
          );
      });
      return promise;
  }

  nearby(token: string) {
    const _url = this.nearbyURL+"&access_token="+token;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get(_url)
        .toPromise()
        .then(
            res => { // Success
                resolve(res);
            }
        );
    });
    return promise;
  }

  geocode(token: string) {
    const _url = this.geocodeURL+"&access_token="+token;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get(_url)
        .toPromise()
        .then(
            res => { // Success
                resolve(res);
            }
        );
    });
    return promise;
  }

  textsearch(token: string) {
    const _url = this.textsearchURL+"&access_token="+token;
    const promise = new Promise((resolve, reject) => {
      this.httpClient.get(_url)
        .toPromise()
        .then(
            res => { // Success
                resolve(res);
            }
        );
    });
    return promise;
  }


  jsonp(uri) {
    return new Promise(function(resolve, reject) {
      const id = '_' + Math.round(10000 * Math.random());
        const callbackName = 'jsonp_callback_' + id;
        window[callbackName] = function(data) {
            delete window[callbackName];
            const ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
            resolve(data);
        };
        const src = uri + '&callback=' + callbackName;
        const script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.addEventListener('error', reject);
        (document.getElementsByTagName('head')[0] || document.body || document.documentElement).appendChild(script);
    });
  }

}
