import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ActivatedRoute, Router } from '@angular/router';

import { SOAPService } from '../soap.service';

@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.css']
})
export class ForecastingComponent implements OnInit {

  location = {
    "latitude": "37.773",
    "longitude": "-122.43"
  }

  // Saves the URL of the endpoint that contains the forecasting data
  forecastURL: string;
  // Keep the Forecasting data
  forecastItems: any[];

  constructor(public soap:SOAPService, private route: ActivatedRoute, 
    private router: Router) { 

      this.forecastURL = ""
      // This code can be improved by making the arrangement dynamic
      this.forecastItems = [{"icon":""}, {"icon":""}, {"icon":""}]
      this.getPoint()
  }

  ngOnInit() {
  }

  /**------------- Get the URL Forecast for this location ------------------- */
  getPoint(){
    this.soap.getPoint(
      this.location.latitude, 
      this.location.longitude).subscribe((data: any) => {
      
      this.forecastURL = data.properties.forecast
      this.getForecast()

    });
  }

  /** -------Send the URL obtained from the location for the forecast --------*/
  getForecast() {
    this.soap.getForecast(this.forecastURL).subscribe((data) => {

      // I take only the first three periods (morning, afternoon, noon)
      this.forecastItems = data.properties.periods.slice(0,3)
    });
  }

}
