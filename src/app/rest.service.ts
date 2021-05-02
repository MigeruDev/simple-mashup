import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import { map, catchError, tap } from 'rxjs/operators';
import { NONE_TYPE } from '@angular/compiler';


const endpoint = 'https://flask-app-web-scrap.herokuapp.com/';
var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class RESTService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  /**------------- Get all provinces of the Ecuador ------------------- */
  getProvinces(): Observable<any> {
    return this.http.get(endpoint + 'provinces').pipe(
      map(this.extractData));
  }

  /**------------- Get all the cities of a province ------------------- */
  getCities(province): Observable<any> {
    return this.http.get(endpoint + 'cities?province='+province).pipe(
      map(this.extractData));
  }

  /** ----------------- Get info data from a city ----------------*/
  getCityInfo(city): Observable<any>{
      return this.http.get(endpoint+ 'info_city?city='+city).pipe(
          map(this.extractData)
      );
  }

  /** ----------------- Get information of hotels nearby a city ----------------*/
  getHotels(lat, lng, checkIn, checkOut, rooms, sortOrder): Observable<any>{
    const params = new HttpParams()
    .set("lat", lat)
    .set("lng", lng)
    .set("checkIn", checkIn)
    .set("checkOut", checkOut)
    .set("rooms", rooms)
    .set("sortOrder", sortOrder);

    return this.http.get(endpoint+ 'hotels', {params}).pipe(
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