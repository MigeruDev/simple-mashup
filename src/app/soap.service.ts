import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'https://api.weather.gov/points/';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class SOAPService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  /**------------- Get the URL Forecast for this location ------------------- */
  getPoint(latitude, longitude): Observable<any> {
    return this.http.get(endpoint + latitude+','+longitude).pipe(
      map(this.extractData));
  }

  /** -------Send the URL obtained from the location for the forecast --------*/
  getForecast(forecastURL): Observable<any>{
      return this.http.get(forecastURL).pipe(
          map(this.extractData)
      );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}