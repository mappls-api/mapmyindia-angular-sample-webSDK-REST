import { Component, OnInit } from '@angular/core';
import { DemoService } from './app.service';

declare var MapmyIndia: any;
declare var L: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DemoApp';
  public map : any;
  constructor(private demoService: DemoService) {
  }
  private token: string;

  ngOnInit(): void {
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

  distenceMatrix() {
    // tslint:disable-next-line: max-line-length
    this.demoService.jsonp('https://apis.mapmyindia.com/advancedmaps/v1/<Rest_Key>/distance_matrix/driving/77.983936,28.255904;77.05993,28.487555;77.15993,28.587555;77.264997,28.554534?sources=0;1&destinations=2;3').then(function(data) {
        console.log(data);
    });
  }

  Rev_geocode() {
    // tslint:disable-next-line: max-line-length
    this.demoService.jsonp('https://apis.mapmyindia.com/advancedmaps/v1/<Rest_Key>/rev_geocode?lng=77.22479939&lat=28.66289505').then(function(data) {
        console.log(data);
    });
  }

}

