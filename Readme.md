![MapmyIndia APIs](https://www.mapmyindia.com/api/img/mapmyindia-api.png)
# Angular Sample for MapmyIndia Interactive Maps JS SDK & MapmyIndia RESTful APIs for Web

**Easy To Integrate Maps & Location APIs & SDKs For Web & Mobile Applications**

Powered with India's most comprehensive and robust mapping functionalities.
**Now Available**  for Srilanka, Nepal, Bhutan, Myanmar and Bangladesh

You can get your api key to be used in this document here: [https://www.mapmyindia.com/api/signup](https://www.mapmyindia.com/api/signup)

## Pre-requisites & Assumptions

1. Supported frameworks: Angular 6 & above (this sample is written in Angular 6)
2. CORS to be ENABLED: You need to ask [API Support](mailto:apisupport@mapmyindia.com) to enable CORS for your credentials.
3. This sample is provided as a reference only and users can adjust and enhance it to suit their requirements such as for upgraded Angular versions.

## Steps to use MapmyIndia REST APIs & Interactive Map in Angular 6

### 1. First Create your Angular App
### 2. Create file name of *`proxy.conf.json`* in your project and put given code :-
```json
{
    "/api/*": 
    {
        "target": "https://outpost.mapmyindia.com",
        "secure": false,
        "logLevel": "debug"
    }
}
```
### 3. Then add line *`"proxyConfig": "proxy.conf.json"`* in angular.json file under *`"serve"`*.
    
Example: 
```json
    "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
        "browserTarget": "DemoApp:build",
        "proxyConfig": "proxy.conf.json"
        },
        "configurations":{
        "production": {
        "browserTarget": "DemoApp:build:production"
        }
    }
}
```
### 4. Then replace the line *`"start":"" to "start": "ng serve --port 4200 --proxyconfig proxy.conf.json"`* in package.json file.
    
Example: 
```json
    "scripts": {
    "ng": "ng",
    "start": "ng serve --port 4200 --proxy-config proxy.conf.json",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
    }
```

### 5. Create service page and put the given code:-
    
```js
    import { Injectable } from "@angular/core";
    import { HttpClient } from '@angular/common/http';
    import { Observable } from "rxjs";
    @Injectable({
    providedIn: 'root'
        })
    export class DemoService {
    constructor(private httpClient: HttpClient) {
        }
    private grantType: string = "client_credentials";
    private clientId: string = "<client_id>";
    private clientSecret: string = "<client_secret>";
    private securityURL: string = "https://outpost.mapmyindia.com/api/security/v3.0.5/oauth/token?grant_type=" + this.grantType + "&client_id=" + this.clientId + "&client_secret=" + this.clientSecret;
    private autoSuggestURL: string = "https://atlas.mapmyindia.com/api/places/search/json?query=agra&location=28.5454,77.455454&bridge&explain&username=balmukand";
    private nearbyURL: string = "https://atlas.mapmyindia.com/api/places/nearby/json?explain&richData&username=balmukand&refLocation=28.467470,77.077518&keywords=FINATM";
```
#### Generating Token using Client_Id & Client_Secret
```js
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
```
#### OAuth Autosuggest using token
```js
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
```
#### OAuth Nearby using token

```js
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
```

#### OAuth Geocode API using token

```js
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
```

#### OAuth TextSearch API using token

```js
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
```

### 6. Call OAuth API (AutoSuggest, Nearby, Geocode, TextSearch), write given code in *`app.component.ts`* file.
```js
    import { Component, OnInit } from '@angular/core';
    import { DemoService } from './app.service';
        declare var MapmyIndia: any; // Declaring Mapmyindia
        declare var L: any; // Declaring L
        @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit {
        title = 'DemoApp';
        public map : any; // Initializing Map Variable
        constructor(private demoService: DemoService) {
        }
        private token: string;
        ngOnInit(): void {
            // Creating Map
            this.map = new MapmyIndia.Map('map',
            {
                center: [28.04, 78.2],
                zoom: 12
            });

            this.demoService.getToken().then((data) => {
                this.token = data['access_token'];
            });
        }
        auto() {
            this.demoService.autoSuggest(this.token).then((data) => {
                console.log(data);
            });
        }
        nearby() {
            this.demoService.nearby(this.token).then((data) => {
                console.log(data);
            });
        }
        geocode(){
            this.demoService.geocode(this.token).then((data) => {
              console.log(data);
            });
        }
        textsearch(){
            this.demoService.textsearch(this.token).then((data) => {
              console.log(data);
            });
        }
    }
```
### 7. For showing response using button, write given code in *`app.component.html`*.

**Using the above code, results are shown in alert & console**

```html
    <div style="text-align:center">
        <h1>
            Welcome to {{ title }}!
        </h1>
        <div id="map"></div><br> //div for map
        <hr/>
        <h4>REST API</h4>
        <button (click)="nearby()">Atl_Nearby</button>
        <button (click)="auto()">Atl_Auto</button>
        <button (click)="geocode()">Atl_Geocode</button>
        <button (click)="textsearch()">Atl_Textsearch</button>
    </div>
```
### 8. Giving height & width to the Map
*`app.component.css`*
```css
    #map{
    height: 70vh;
    width: 100%;
    }
```

### 9. Run the Project

Command: `npm start`

### 10. Write `index.html` file

```html
    <script src="https://apis.mapmyindia.com/advancedmaps/v1/<Map_Key>/map_load?v=1.3"></script>
```

That's it Folks !!!

For any queries and support, please contact: 

![Email](https://www.google.com/a/cpanel/mapmyindia.co.in/images/logo.gif?service=google_gsuite)
 
Email us at [apisupport@mapmyindia.com](mailto:apisupport@mapmyindia.com)

![](https://www.mapmyindia.com/api/img/icons/stack-overflow.png)
[Stack Overflow](https://stackoverflow.com/questions/tagged/mapmyindia-api)
Ask a question under the mapmyindia-api

![](https://www.mapmyindia.com/api/img/icons/support.png)
[Support](https://www.mapmyindia.com/api/index.php#f_cont)
Need support? contact us!

![](https://www.mapmyindia.com/api/img/icons/blog.png)
[Blog](http://www.mapmyindia.com/blog/)
Read about the latest updates & customer stories


> © Copyright 2019. CE Info Systems Pvt. Ltd. All Rights Reserved. | [Terms & Conditions](http://www.mapmyindia.com/api/terms-&-conditions)
