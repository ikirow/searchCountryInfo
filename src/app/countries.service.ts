import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryInterface } from './countryInterface';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  REST_COUNTREIS_API_URL = 'https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;region;subregion;timezones;flag;currencies';

  constructor(private httpClient: HttpClient) { }

  private countries: Array<object> = [];

  // public timeOffset = new Date().getTimezoneOffset();

  getAllCountries(): Observable<CountryInterface[]> {
    return this.httpClient.get<CountryInterface[]>(this.REST_COUNTREIS_API_URL).pipe(
      tap(data => console.log( /*'All: ' + JSON.stringify(data) */)),
      catchError(this.handleError)
    );
  }

  getCountry(countryName, callback: (data) => void) {
    return this.getAllCountries().subscribe(result => {
      console.log('---------');
      let returnObj = {};
      const matchedResult = result.map(country => {
        if (country.name === countryName) {
          console.log('returning country details ', country);
          returnObj = country;
        }
      });
      console.log('---------');
      callback(returnObj);  // execute the callback function to act on the matched result;
    },
      error => {
        console.log(error);
      }
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    }
  }
}
