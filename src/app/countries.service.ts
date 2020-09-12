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


   /**
 * Get all countries from Restcountries API
 * @return {String}  the Restcountries endpoint for all countries configured to get only the nessecery fields in string format
 */
  getAllCountries(): Observable<CountryInterface[]> {
    return this.httpClient.get<CountryInterface[]>(this.REST_COUNTREIS_API_URL);
  }

}
